import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute, Params, ParamMap, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    searchPage: any;
    searchedData: any[] = [];
    searchedText: any;
    token: any;
    rString: any;
    success: any;
    error: any;
    userId: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
	        this.searchedText = params['search'];
        });
        this.searchPage = this.searchedText;
        this.userId = this.utilsService.validateUser();
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            if(params['search'] != this.searchedText) {
                this.searchedText = params['search'];
                this.searching();
            }
            this.searching();
        });
    }

    searching(){
        var params = {product_name: this.searchedText};
        this.dataService.searching(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.searchedData = data.data;
                } else {
                    
                }
            }
        );
    }

    addToCart(productId, type){
        if(!this.token){
            this.rString = this.utilsService.randomString(30);
            this.utilsService.saveData("alutoken", this.rString);
            this.token = this.utilsService.getData('alutoken');
        }
        
        var params = {product_id: productId, user_id: this.token, type: type, quantity: '1'};
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

}
