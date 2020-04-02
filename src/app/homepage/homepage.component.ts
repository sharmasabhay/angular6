import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { AgedialogComponent } from '../agedialog/agedialog.component'; 

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    slideConfig:any;
    products: any[]=[];
    userId: any;
    success: any;
    error: any;
    rString: any;
    token: any;
    ageLegal: any;
    result: boolean = false;
    productAdd: any[] = [];
    productQuantity: any[] = [];
    recentProducts: any[] = [];
    selectAllProducts: any = false;
    cartTotal: any;
    allProductsId: any[] = [];
    deviceInfo;
    bulkPrice: any;

    constructor(public dialog: MatDialog, private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {
  		 this.slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, 
  		 "autoplay": true, "autoplaySpeed": 2000, "dots": true , "arrows": false};
       this.userId = this.utilsService.validateUser();
       this.ageLegal = this.utilsService.getData('alulegal');
       var deviceInfo = this.utilsService.getDevice();
       this.deviceInfo = deviceInfo.device;
       this.token = this.utilsService.getData('alutoken');
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.add('homepage');
        console.log(this.token);
    }

    ngOnInit() {
        this.newArrivals();
        window.scrollTo(0, 0);
        if(this.ageLegal != 'yes'){
            setTimeout(() => {
                this.showagePopup();
            }, 200);
        }
        if(this.userId){
            this.orderListing();
            this.recentOrder();
        }
        
    }

    showagePopup() {
        const dialogRef = this.dialog.open(AgedialogComponent, {
            height: '300px',
            width: '600px',
            disableClose: true
        });
    }

    showRecentOrderPopup() {
        const dialogRef = this.dialog.open(RecentOrderPopup, {
            height: '520px',
            width: '650px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(data => {
            
        }); 
    }

    newArrivals(){
        var params = {};
        this.dataService.newArrivals(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.products = data.data;
                    //this.bulkPrice = data.data.bult_price[2];
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

    addToCartHome(productID, type){
        if(!this.token){
            this.rString = this.utilsService.randomString(30);
            this.utilsService.saveData("alutoken", this.rString);
            this.token = this.utilsService.getData('alutoken');
        }
        var params = {product_id: productID, quantity: '1', user_id: this.token, type: type};
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

    selectedProduct(productId, prodQuantity) {
        var allProducts = [];
        var allProductsQuantity = [];
        allProducts = this.productAdd;
        allProductsQuantity = this.productQuantity;
        this.productAdd = [];
        this.productQuantity = [];
        var found = -1;
        var foundQuantity = -1;

        for(var loop = 0; loop < allProducts.length; loop++) {
            if(productId == allProducts[loop]) {
                found = loop;                
            }
        }

        for(var loop = 0; loop < allProductsQuantity.length; loop++) {
            if(prodQuantity == allProductsQuantity[loop]) {
                foundQuantity = loop;                
            }
        }

        if(found > -1) {
            delete allProducts[found];
        } else {
            allProducts.push(productId);
        }

        if(foundQuantity > -1) {
            delete allProductsQuantity[foundQuantity];
        } else {
            allProductsQuantity.push(prodQuantity);
        }

        for(var loop = 0; loop < allProducts.length; loop++) {
            if(allProducts[loop] !== undefined) {
                this.productAdd.push(allProducts[loop]);
            }    
        }

        for(var loop = 0; loop < allProductsQuantity.length; loop++) {
            if(allProductsQuantity[loop] !== undefined) {
                this.productQuantity.push(allProductsQuantity[loop]);
            }    
        }
    }

    recentOrder(){
        var params = {user_id: this.userId};
        this.dataService.recentOrder(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.recentProducts = data.data.products;
                } else {
                    
                }
            }
        );
    }

    orderListing(){
        this.result = false;
        var params = {user_id: this.userId};
        this.dataService.orderListing(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.result = true;
                } else {
                    if(data.error){
                        
                    }
                }
            }
        );
    }

    selectAllRecentOrders() {
        this.productAdd = [];
        this.productQuantity = [];

        for(var loop = 0; loop < this.recentProducts.length; loop++) {
            if(this.selectAllProducts != true) {
                this.productAdd.push(this.recentProducts[loop]['product_id']);
                this.productQuantity.push(this.recentProducts[loop]['quantity']);
                this.recentProducts[loop]['checked'] = true;
            } else {
                this.recentProducts[loop]['checked'] = false;
            }    
        }    
    }

    checkIfProductSelected(product_id) {
        var found = false;
        for(var loop = 0; loop < this.productAdd.length; loop++) {
            if(this.productAdd[loop] == product_id) {
                found = true;
            }  
        }

        return found;
    }

    addToCart(type){
        if(!this.token){
            this.rString = this.utilsService.randomString(30);
            this.utilsService.saveData("alutoken", this.rString);
            this.token = this.utilsService.getData('alutoken');
        }
        console.log(this.token);
        
        var params = {product_id: this.productAdd, user_id: this.token, type: type, quantity: this.productQuantity};
        this.dataService.addToCartRecent(params)
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
}


@Component({
  selector: 'app-recentorderdialog',
  templateUrl: './recentorderdialog.component.html',
  styleUrls: ['./homepage.component.css']
})
export class RecentOrderPopup implements OnInit {
    orderstep1:boolean = true;
    orderstep2: boolean = false;
    userId: any;
    history: any;
    errorMessage: any;
    success: any;
    error: any;
    orderDetail: any[] = [];
    orderItems: any[] = [];
    productAdd: any[] = [];
    productQuantity: any[] = [];
    selectAllProducts: any = false;
    quantityAdd: any[] = [];
    token: any;
    rString: any;
    messageShow: boolean = false;
    aDisable: boolean = true;
    addTrue: boolean = false;
    tier: any;
    customPrice: any;
    updateList: any[] = [];

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, public dialogRef: MatDialogRef<RecentOrderPopup>) {
        this.userId = this.utilsService.validateUser();
        this.token = this.utilsService.getData('alutoken');
    }

    ngOnInit() {
        this.orderListing();
    }

    showorderdetail(orderID){
        this.orderstep1 = false;
        this.orderstep2 = true;
        var params = {order_id: orderID};
        this.dataService.orderHistory(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.orderDetail = data.data;
                    this.orderItems = data.data.products;
                } else {
                    
                }
            }
        );
     }

     updateCart(){
        var params = {user_id: this.token, products: this.orderItems};
        this.dataService.updateCart(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.updateList = data.data;
                } else {
                    
                }
            }
        );
    }

     backToHistory(){
        this.orderstep1 = true;
        this.orderstep2 = false;
     }

     orderListing(){
        var params = {user_id: this.userId};
        this.dataService.orderListing(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.history = data.data;
                } else {
                    if(data.error){
                        this.errorMessage = true;
                    }
                }
            }
        );
    }

    onIncrement(item, index) {
        item['tier'] = this.orderItems[index]['bult_price'];
        item['quantity'] = parseInt(item['quantity']) + 1;

        if(item['quantity'] == 1){
            item['price'] = item['unit_price'];
        } else if(item['quantity'] > 1 && item['quantity'] < 6) {
            item['price'] = (item['quantity'] * item['tier'][0]['price']).toFixed(2);
        } else if(item['quantity'] > 5 && item['quantity'] < 11) {
            item['price'] = (item['quantity'] * item['tier'][1]['price']).toFixed(2);
        } else { 
            item['price'] = (item['tier'][2]['price']).toFixed(2);
        }
    } 

    onDecrement(item, index) {
        item['tier'] = this.orderItems[index]['bult_price'];

        if(item['quantity'] > 1){
            item['quantity'] = parseInt(item['quantity']) - 1;
        }
        if(item['quantity'] == 1){
            item['price'] = item['unit_price'];
        } else if(item['quantity'] > 1 && item['quantity'] < 6) {
            item['price'] = (item['quantity'] * item['tier'][0]['price']).toFixed(2);
        } else if(item['quantity'] > 5 && item['quantity'] < 11) {
            item['price'] = (item['quantity'] * item['tier'][1]['price']).toFixed(2);
        } else { 
            item['price'] = (item['tier'][2]['price']).toFixed(2);
        }
    }

    selectedProduct(item, productId) {
        this.addTrue = false;
        //this.productAdd = [];
        for(var loop = 0; loop < this.orderItems.length; loop++){
           if(this.orderItems[loop].check != true){
                this.addTrue = true;
           } else {
                this.addTrue = false;
           }
        }
        if(this.addTrue == true){
            this.productAdd.push(item);
        }
        
    }

    selectAllRecentOrders() {
        this.productAdd = [];
        this.productQuantity = [];

        for(var loop = 0; loop < this.orderItems.length; loop++) {
            if(this.selectAllProducts != true) {
                this.productAdd.push(this.orderItems[loop]);
                this.productQuantity.push(this.orderItems[loop]);
                this.orderItems[loop]['checked'] = true;
            } else {
                this.orderItems[loop]['checked'] = false;
            }    
        }            
    }

    addToCart(type){
        this.messageShow = false;
        if(!this.token){
            this.rString = this.utilsService.randomString(30);
            this.utilsService.saveData("alutoken", this.rString);
            this.token = this.utilsService.getData('alutoken');
        }
        if(this.productAdd.length != 0){
            var params = {user_id: this.token, products: this.productAdd, type: type, quantity: this.productQuantity};
            this.dataService.addToCartMultiple(params)
              .subscribe(
                (data) => {
                    if(data.result == "true") {
                        this.success = data.message;
                        Swal.fire('Success...', this.success, 'success');
                        this.dialogRef.close(RecentOrderPopup);
                    } else {
                        this.error = data.message;
                        Swal.fire('Oops!!!...', this.error, 'error');
                    }
                }
            );
        } else {
            this.messageShow = true;
        }
        
    }

}