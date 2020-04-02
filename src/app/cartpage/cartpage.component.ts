import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent implements OnInit {

    cartList: any[] = [];
    userId: any;
    quantity: number = 0;
    cartQuantity: any[] = [];
    updateList: any[] = [];
    totalCart: any;
    token: any;
    errorMessage: boolean = false;
    hideCart: boolean = true;
    success: any;
    loader: boolean = false;
    cartListing: boolean = true;
    deviceInfo;
    cartListQuantity: any;
    tier: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.userId = this.utilsService.validateUser();
        this.token = this.utilsService.getData('alutoken');
        var deviceInfo = this.utilsService.getDevice();
        this.deviceInfo = deviceInfo.device;
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        this.myCart();
        window.scrollTo(0, 0);
    }

    onIncrement(list) {
        list['quantity'] = parseInt(list['quantity']) + 1;
        list['price'] = list['quantity'] * list['single_price'];
        this.totalCart = this.totalCart + list['single_price'];
        this.updateCart();

        /*if(list['quantity'] > 1 && list['quantity'] < 6){
            list['single_price'] = list['bult_price'][0]['price'];
        } else if(list['quantity'] > 5 && list['quantity'] < 11){
            list['single_price'] = list['bult_price'][1]['price'];
        } else if(list['quantity'] > 11){
            list['single_price'] = list['bult_price'][2]['price'];
        }*/
        
    }

    onDecrement(list) {
        if(list['quantity'] > 1){
            list['quantity'] = parseInt(list['quantity']) - 1;
            list['price'] = list['quantity'] * list['single_price'];
            this.totalCart = this.totalCart - list['single_price'];
        }
        if(list['quantity'] == 0){
            var params = {product_id: list['id'], user_id: this.token};
            this.dataService.deleteCart(params)
              .subscribe(
                (data) => {
                    if(data.result == "true") {
                        this.myCart();
                    } else {

                    }
                }
            );
        }

        this.updateCart();
        
        /*if(list['quantity'] > 1 && list['quantity'] < 6){
            list['single_price'] = list['bult_price'][0]['price'];
        } else if(list['quantity'] > 5 && list['quantity'] < 11){
            list['single_price'] = list['bult_price'][1]['price'];
        } else if(list['quantity'] > 11){
            list['single_price'] = list['bult_price'][2]['price'];
        }*/
        
    }

    myCart(){
        this.loader = true;
        this.cartListing = false;
        this.errorMessage = false;
        this.hideCart = true;
        var params = {user_id: this.token};
        this.dataService.myCart(params)
          .subscribe(
            (data) => {
                this.loader = false;
                this.cartListing = true;
                if(data.result == "true") {
                    this.cartList = data.data;
                    this.cartListQuantity = data.data.quantity;
                    this.totalCart = data.total_price;
                    this.tier = data.data.bult_price;

                    for(var loop = 0; loop < this.cartList.length; loop++) {
                        if(this.cartList[loop]['quantity'] > 1 && this.cartList[loop]['quantity'] < 6 ){
                            this.cartList[loop]['single_price'] = this.cartList[loop]['bult_price'][0]['price'];
                        } else if(this.cartList[loop]['quantity'] > 5 && this.cartList[loop]['quantity'] < 11){
                            this.cartList[loop]['single_price'] = this.cartList[loop]['bult_price'][1]['price'];
                        } else if(this.cartList[loop]['quantity'] > 11){
                            this.cartList[loop]['single_price'] = this.cartList[loop]['bult_price'][2]['price'];
                        }
                    }
                } else {
                    if(data.message == 'Data not found'){
                        this.errorMessage = true;
                        this.hideCart = false;
                    }
                }
            }
        );
    }

    updateMyCart(){
        this.errorMessage = false;
        this.hideCart = true;
        var params = {user_id: this.token};
        this.dataService.myCart(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.cartList = data.data;
                    this.totalCart = data.total_price;
                } else {
                    if(data.message == 'Data not found'){
                        this.errorMessage = true;
                        this.hideCart = false;
                    }
                }
            }
        );
    }

    updateCart(){
        var params = {user_id: this.token, products: this.cartList, promo: 'false'};
        this.dataService.updateCart(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.updateList = data.data;
                    this.success = data.message;
                    this.updateMyCart();
                } else {
                    
                }
            }
        );
    }

    deleteCart(product_ID, wrapperId, promotion) {
        Swal.fire({
            title: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }) .then((result) => {
            if (result.value) {
                var params = {product_id: product_ID, user_id: this.token, gift_wrapperid: wrapperId, promo: promotion};
                this.dataService.deleteCart(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            this.myCart();
                        } else {

                        }
                    }
                );
            }
        });
    }

}
