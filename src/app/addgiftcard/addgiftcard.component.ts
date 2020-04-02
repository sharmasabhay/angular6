import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addgiftcard',
  templateUrl: './addgiftcard.component.html',
  styleUrls: ['./addgiftcard.component.css']
})
export class AddgiftcardComponent implements OnInit {
    
    category_Id: any;
    products: any[] = [];
    activeLink: string = '50';
    quantity: any = 1;
    activePrice: string = '50';
    userId: any;
    success: any;
    error: any;
    gift: any = {};
    token: any;
    totalPrice: any = 50;
    activeTotal: any;
    notFound: boolean = false;
    giftContent: boolean = true;
    mobileNo: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.category_Id = this.activatedRoute.snapshot.paramMap.get('id');
        this.userId = this.utilsService.validateUser();
        this.token = this.utilsService.getData('alutoken');
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.giftProduct();
    }

    giftProduct(){
        this.notFound = false;
        this.giftContent = true;
        var params = {giftcat_id: this.category_Id};
        this.dataService.giftProduct(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.products = data.data[0];
                } else {
                    if(data.error == 'Data not found'){
                        this.notFound = true;
                        this.giftContent = false;
                    }
                }
            }
        );
    }

    chooseSection(link) {
        this.activeLink = link;
        if(this.activeLink == '1'){
            this.activePrice = '50';
            this.activeTotal = '50';
            this.totalPrice = '50';
        } else if(this.activeLink == '2'){
            this.activePrice = '100';
            this.activeTotal = '100';
            this.totalPrice = '100';
        } else {
            this.activePrice = '200';
            this.activeTotal = '200';
            this.totalPrice = '200';
        }
    }

    onIncrement(){
        this.quantity = parseInt(this.quantity) + 1;
        this.totalPrice = this.quantity * parseFloat(this.activePrice);
    }

    onDecrement(){
        this.quantity = parseInt(this.quantity) - 1;
        this.totalPrice = this.quantity * parseFloat(this.activePrice);
    }

    addToCart(productID, type, certificate){
        if(this.gift.recipient_name == undefined){
            return false;
        }
        if(this.gift.recipient_email == undefined){
            return false;
        }
        if(this.gift.message == undefined){
            return false;
        }

        this.mobileNo = '65' + this.gift.mobile;

        var params = {product_id: productID, quantity: this.quantity, user_id: this.token, recipient_name: this.gift.recipient_name, recipient_email: this.gift.recipient_email, message: this.gift.message, price: this.activeTotal, total: this.totalPrice, type: type, gift_certificate: certificate, mobile_no: this.mobileNo};
        this.dataService.giftAddtocart(params)
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
