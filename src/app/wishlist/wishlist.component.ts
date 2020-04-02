import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

    wishlist: any[] = [];
    userId: any;
    errorMessage: any;
    deviceInfo;
    opened: boolean = false;
    status: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.userId = this.utilsService.validateUser();
        var deviceInfo = this.utilsService.getDevice();
        this.deviceInfo = deviceInfo.device;
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        this.myWishlist();
    }

    myWishlist(){
        var params = {user_id: this.userId};
        this.dataService.myWishlist(params)
          .subscribe(
            (data) => {
                this.wishlist = [];
                if(data.result == "true") {
                    for (var i = 0; i < data.data.length; i++) {
                        this.wishlist.push(data.data[i]);
                    }
                } else {
                    if(data.error == 'Data not found'){
                        this.errorMessage = true;
                    }
                }
            }
        );
    }

    deleteWishlist(product_ID) {
        this.errorMessage = false;
        Swal.fire({
            text: "Remove item from wishlist?",
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }) .then((result) => {
            if (result.value) {
                var params = {product_id: product_ID, user_id: this.userId};
                this.dataService.deleteWishlist(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            this.myWishlist();
                        } else {

                        }
                    }
                );
            }
        });
    }

    sideMenu(){
        this.opened = !this.opened;
        this.status = !this.status; 
    }

}
