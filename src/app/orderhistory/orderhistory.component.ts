import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

    rate:any;
    userId: any;
    history: any[] = [];
    errorMessage: boolean = false;
    rating: any;
    thankyou: boolean = false;
    token: any;
    opened: boolean = false;
    status: any;
    deviceInfo;
    show: number = 10;
    showLessButton: boolean = false;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.userId = this.utilsService.validateUser();
        this.token = this.utilsService.getData('alutoken');
        var deviceInfo = this.utilsService.getDevice();
        this.deviceInfo = deviceInfo.device;
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        this.orderListing();
    }

    sideMenu(){
        this.opened = !this.opened;
        this.status = !this.status; 
    }

    showMore(){
        this.show += 10;
        this.showLessButton = true;
    }

    showLess(){
        this.show -= this.history.length;
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

    getRating(order){
        if(order['rating']){
            var params = {orders: order, user_id: this.token};
            this.dataService.orderRating(params)
              .subscribe(
                (data) => {
                    if(data.result == "true") {
                        this.thankyou = data.message;
                        //this.orderListing();
                    } else {

                    }
                }
            );
        }
    }

}