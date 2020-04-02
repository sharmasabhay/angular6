import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-giftwrapper',
  templateUrl: './giftwrapper.component.html',
  styleUrls: ['./giftwrapper.component.css']
})
export class GiftwrapperComponent implements OnInit {

    products: any[] = [];
    wrapper: any = {};
    cartList: any[] = [];
    token: any;
    wrapperId: any;
    success: any;
    error: any;
    selectedCart: any[] = [];
    productRequired: boolean = false;
    category_Id: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) { 
        this.token = this.utilsService.getData('alutoken');
        this.category_Id = this.activatedRoute.snapshot.paramMap.get('id');
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.giftProduct();
        this.myCart();
    }

    giftProduct(){
        var params = {giftcat_id: this.category_Id};
        this.dataService.giftProduct(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.products = data.data[0];
                    this.wrapperId = data.data[0].id;
                } else {
                    
                }
            }
        );
    }

    myCart(){
        var params = {user_id: this.token};
        this.dataService.wrapperList(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
			        for(var loop = 0; loop < data.data.length; loop++) {
			            data.data[loop].quantity = 0;
			            if(!data.data[loop].recipient_name){
			                this.cartList.push(data.data[loop]);
			            }
			        }
                } else {
                    
                }
            }
        );
    }

    onIncrement(list) {
        if(list['quantity'] <1 && this.checkCartItems()){
            list['quantity'] = parseInt(list['quantity']) + 1;
            list['price'] = list['quantity'] * list['single_price'];
        }
    } 

    onDecrement(list) {
        if(list['quantity'] == 1){
           list['quantity'] = parseInt(list['quantity']) - 1;
           list['price'] = list['quantity'] * list['single_price'];
        }
    }

    checkCartItems(){
        var flag = 0;
        for(var loop = 0; loop < this.cartList.length; loop++){
            if(this.cartList[loop]['quantity'] > 0){
                flag++;
            }
        }

        if(flag == 4){
            return false;
        } else {
            return true;
        }
    }

    addToCart(type){
        this.productRequired = false;
        for(var loop = 0; loop < this.cartList.length; loop++){
            if(this.cartList[loop]['quantity'] > 0 ){
                this.selectedCart.push(this.cartList[loop]);
            }
        }
        if(this.selectedCart.length == 0){
           this.productRequired = true;
           return false;
        }

        var params = {giftproducts: this.selectedCart, user_id: this.token, gift_wrapperid: this.wrapperId, type: type, recipient_name: this.wrapper.recipient_name, message: this.wrapper.message};
        this.dataService.giftAddtocart(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.success = data.message;
                    Swal.fire('Success...', this.success, 'success');
                } else {
                    this.error = data.message;
                }
            }
        );
    }

}
