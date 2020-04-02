import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.css']
})
export class OrderplacedComponent implements OnInit {

    userId: any;
    orderId: any;
    history: any;
    orderDate: any;
    historyPayment: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, public datepipe: DatePipe) {
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
                    this.history = data.data;
                    this.historyPayment = data.data.payment_total;
                    this.orderDate = data.data.delivery_date;
                } else {
                    
                }
            }
        );
    }

}
