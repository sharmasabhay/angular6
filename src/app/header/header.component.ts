import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    userId: any;
    cartTotal: any;
    token: any;
    myControl = new FormControl();
    searchingField: any;
    searchedData: any[] = [];
    searchedLimitData: any[] = [];
    menuDropdown: boolean = false;
    deviceInfo;
    mobileSearch: boolean = false;
    events: string[] = [];
    categories: any[] = [];
    subcategoryMenu: boolean = false;
    catMenu: any;
    opened: boolean = false;
    status: any; 
    notFound: any;
    openSidemenu: boolean = false;
    profileSetting: boolean = false;
    empty: boolean = false;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.userId = this.utilsService.validateUser();
        this.token = this.utilsService.getData('alutoken');
        var deviceInfo = this.utilsService.getDevice();
        this.deviceInfo = deviceInfo.device;
        if(this.router.url == "/account" || this.router.url == "/orders" || this.router.url == "/account/changepassword" || this.router.url == "/account/address" || this.router.url == "/account/wishlist"){
            this.profileSetting = true;
        }
    }

    ngOnInit() {
        this.totalCart();
        if(this.deviceInfo == 'phone'){
           this.categoryList();
        }
    }

    emptyCart(){
        this.empty = !this.empty;
    }

    closeCart(){
        this.empty = false;
    }

    logOut(){
        this.utilsService.userLogout();
        this.router.navigate(['/home']);
    }

    totalCart(){
        var cart = setInterval(() => {
            this.token = this.utilsService.getData('alutoken');
            var params = {user_id: this.token};
            this.dataService.totalCart(params)
              .subscribe(
                (data) => {
                    if(data.result == "true") {
                       if(this.token){
                          this.cartTotal = data.data;
                       } else {
                          this.cartTotal = 0;
                       }
                    } else {
                        
                    }
                }
            );
        }, 2000);
    }

    searching(){
        var params = {product_name: this.searchingField};
        this.dataService.searching(params)
          .subscribe(
            (data) => {
                this.searchedData = [];
                if(data.result == "true") {
                    this.searchedData = data.data;
                } else {
                    
                }
            }
        );
    }

    limitSearching(){
        var params = {product_name: this.searchingField};
        this.dataService.limitSearching(params)
          .subscribe(
            (data) => {
                this.searchedLimitData = [];
                this.notFound = '';
                if(data.result == "true") {
                    this.searchedLimitData = data.data;
                } else {
                    this.notFound = data.error;
                }
            }
        );
    }

    findAllResults(){
        this.router.navigate(['/search'], { 
            queryParams: { 
                search: this.searchingField
            }
        });
    }

    openMenu(){
        this.menuDropdown = !this.menuDropdown;
    }

    openMobileSearch(){
        this.mobileSearch = true;
    }

    closeSearch(){
        this.mobileSearch = false;
    }

    sideMenu(){
        this.opened = !this.opened;
        this.status = !this.status; 
    }

    categoryMenu(category){
        category['subcategoryMenu'] = !category['subcategoryMenu'];
        category['catMenu'] = !category['catMenu'];
    }

    categoryList(){
        var params = {};
        this.dataService.categoryList(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.categories = data.data;
                } else {
                    
                }
            }
        );
    }

    openAccountMenu(){
        if(this.router.url == "/account" || this.router.url == "/orders" || this.router.url == "/account/changepassword" || this.router.url == "/account/address" || this.router.url == "/account/wishlist"){
            this.openSidemenu = !this.openSidemenu;
        }
    }

}
