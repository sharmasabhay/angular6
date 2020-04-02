import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-giftpackaging',
  templateUrl: './giftpackaging.component.html',
  styleUrls: ['./giftpackaging.component.css']
})
export class GiftpackagingComponent implements OnInit {

    products: any[] = [];
    category_Id: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.category_Id = this.activatedRoute.snapshot.paramMap.get('id');
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
       this.giftProduct();
    }

    giftProduct(){
        var params = {giftcat_id: this.category_Id};
        this.dataService.giftProduct(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.products = data.data;
                } else {
                    
                }
            }
        );
    }

}
