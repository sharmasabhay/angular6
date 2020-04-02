import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

    userId: any;
    orderId: any;
    orderDetail: any[] = [];
    orderItems: any[] = [];
    deliveryAddress: any[] = [];
    orderDate: any;
    specificChargeText: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.userId = this.utilsService.validateUser();
        this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        this.orderHistory();
    }

    orderHistory(){
        var params = {order_id: this.orderId};
        this.dataService.orderHistory(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.orderDetail = data.data;
                    this.orderItems = data.data.products;
                    this.deliveryAddress = data.data.delivery_address;
                    this.orderDate = data.data.delivery_date;
                    if(this.orderDetail['delivery_type'] == 0){
                        this.specificChargeText = 'Same Day Delivery Charge';
                    } else if(this.orderDetail['delivery_type'] == 1){
                        this.specificChargeText = 'Next Day Delivery Charge';
                    } else if(this.orderDetail['delivery_type'] == 2){
                        this.specificChargeText = '2 Hour Delivery Charge';
                    } else if(this.orderDetail['delivery_type'] == 3){
                        this.specificChargeText = 'Store pickup Charge';
                    }
                } else {
                    if(data.error){
                        
                    }
                }
            }
        );
    }

}
