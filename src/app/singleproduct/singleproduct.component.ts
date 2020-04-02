import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../services/data.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class SingleproductComponent implements OnInit {
    relatedProductConfig: any;
    details: any [] = [];
    productSlug: any;
    userId: any;
    success: any;
    error: any;
    relatedProducts: any[] = [];
    quantity: number = 1;
    deviceInfo;
    token: any;
    rString: any;
    loader: boolean = false;
    detailSection: boolean = true;
    tier: any;
    customPrice: any;
    orignalPrice: any;
    bulkPrice: any;

    constructor(public dialog: MatDialog, private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.productSlug = this.activatedRoute.snapshot.paramMap.get('slug');
        this.userId = this.utilsService.validateUser();
        var deviceInfo = this.utilsService.getDevice();
        this.deviceInfo = deviceInfo.device;
        if(this.deviceInfo == 'desktop'){
            this.relatedProductConfig = {"slidesToShow": 4, "slidesToScroll": 1, "arrows": true};
        } else if(this.deviceInfo == 'tablet'){
            this.relatedProductConfig = {"slidesToShow": 3, "slidesToScroll": 1, "arrows": true};
        } else {
            this.relatedProductConfig = {"slidesToShow": 1, "slidesToScroll": 1, "arrows": true};
        }
        this.token = this.utilsService.getData('alutoken');
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
       window.scrollTo(0, 0);
       this.productDetails();
       this.activatedRoute.params.subscribe(params => {
            if(params.slug != this.productSlug) {
                this.productSlug = params.slug;
                window.scrollTo(0, 0);
                this.productDetails();
            }
        });
    }

    productDetails(){
        this.loader = true;
        this.detailSection = false;
        var params = {slug: this.productSlug};
        this.dataService.productDetails(params)
          .subscribe(
            (data) => {
                this.loader = false;
                this.detailSection = true;
                if(data.result == "true") {
                    this.details = data.data;
                    this.orignalPrice = data.data.price;
                    this.relatedProducts = data.data.related_products;
                    this.tier = data.data.bult_price;
                    this.bulkPrice = data.data.bulkDisable;
                    this.customPrice = this.orignalPrice;
                } else {
                    
                }
            }
        );
    }

    addWishlist(productID){
        var params = {user_id: this.userId, product_id: productID};
        this.dataService.addWishlist(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.success = data.message;
                    Swal.fire('Success...', this.success, 'success');
                } else {
                    this.error = data.message;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }

    addToCart(productID, type){
        if(!this.token){
            this.rString = this.utilsService.randomString(30);
            this.utilsService.saveData("alutoken", this.rString);
            this.token = this.utilsService.getData('alutoken');
        }
        var params = {product_id: productID, quantity: this.quantity, user_id: this.token, type: type};
        this.dataService.addToCart(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.success = data.message;
                    Swal.fire('Success...', this.success, 'success');
                } else {
                    this.error = data.message;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }

    onIncrement() {
        this.quantity = this.quantity + 1;
        if(this.bulkPrice == 0){
            if(this.quantity == 1){
                this.customPrice = this.orignalPrice;
            } else if(this.quantity > 1 && this.quantity < 6){
                this.customPrice = (this.quantity * this.tier[0]['smartPrice']).toFixed(2);
            } else if(this.quantity > 5 && this.quantity < 11){
                this.customPrice = (this.quantity * this.tier[1]['smartPrice']).toFixed(2);
            } 
        } else {
           this.customPrice = (this.quantity * this.orignalPrice).toFixed(2);
        }
    }

    onDecrement(list) {
        if(this.quantity > 1){
            this.quantity = this.quantity - 1;
        }
        if(this.bulkPrice == 0){
            if(this.quantity == 1){
                this.customPrice = this.orignalPrice;
            } else if(this.quantity > 1 && this.quantity < 6){
                this.customPrice = (this.quantity * this.tier[0]['smartPrice']).toFixed(2);
            } else if(this.quantity > 5 && this.quantity < 11){
                this.customPrice = (this.quantity * this.tier[1]['smartPrice']).toFixed(2);
            } 
        } else {
            this.customPrice = (this.quantity * this.orignalPrice).toFixed(2);
        }
    }

}
