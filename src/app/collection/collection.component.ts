import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})

export class CollectionComponent implements OnInit {

    displayMode: number;
    products: any[]=[];
    categoryName: any;
    subCategoryName: any;
    success: any;
    error: any;
    userId: any;
    rString: any;
    token: any;
    currentPage: any = 1;
    totalRecords: any = 0;
    pageTotalPages: any;
    pageNumbers: any[] = [];
    pageRecordsPerPage: any = 30;
    pageStart: any = 1;
    pageEnd: any = this.pageRecordsPerPage;
    pageLast: any = 0;
    deviceInfo;
    selected = 'a-z';
    filters: any;
    filterFeatured: string = 'false';
    filterHigh: string = 'false';
    filterLow: string = 'false';
    filterA: string = 'true';
    filterZ: string = 'false';
    filterOld: string = 'false';
    filterNew: string = 'false';
    filterBestseller: string= 'false';

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.categoryName = this.activatedRoute.snapshot.paramMap.get('slug');
        this.subCategoryName = this.activatedRoute.snapshot.paramMap.get('catslug');
        this.userId = this.utilsService.validateUser();
        var deviceInfo = this.utilsService.getDevice();
        this.deviceInfo = deviceInfo.device;
        this.token = this.utilsService.getData('alutoken');
        this.filters = 'a-z';
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        this.displayMode = 1;
        window.scrollTo(0, 0);
        this.activatedRoute.params.subscribe(params => {
            if(params.slug != this.categoryName) {
                this.categoryName = params.slug;
                window.scrollTo(0, 0);
                this.productListing();
            }
            if(params.catslug != this.subCategoryName) {
                this.subCategoryName = params.catslug;
                window.scrollTo(0, 0);
                this.productListing();
            }
        });
        this.productListing();
    }
 
    onDisplayModeChange(mode: number): void {
        this.displayMode = mode;
    } 

    chooseFilter(){
        this.filterFeatured = 'false';
        this.filterHigh = 'false';
        this.filterLow = 'false';
        this.filterA = 'false';
        this.filterZ = 'false';
        this.filterOld = 'false';
        this.filterNew = 'false';
        this.filterBestseller = 'false';

        if(this.filters == 'featured'){
            this.filterFeatured = 'true';
        } else if(this.filters == 'high-low'){
            this.filterHigh = 'true';
        } else if(this.filters == 'low-high'){
            this.filterLow = 'true';
        } else if(this.filters == 'a-z'){
            this.filterA = 'true';
        } else if(this.filters == 'z-a'){
            this.filterZ = 'true';
        } else if(this.filters == 'oldest-newest'){
            this.filterOld = 'true';
        } else if(this.filters == 'newest-oldest'){
            this.filterNew = 'true';
        } else if(this.filters == 'best-selling'){
            this.filterBestseller = 'true';
        }
        this.productListing();
    }

    productListing(){
        if(this.subCategoryName){
            var params = {slug: this.subCategoryName, page: this.currentPage, featured: this.filterFeatured, hightolowprice: this.filterHigh, lowtohighprice: this.filterLow, ztoa: this.filterZ, atoz: this.filterA, oldtonew: this.filterOld, newtoold: this.filterNew, bestseller: this.filterBestseller};
        } else {
            var params = {slug: this.categoryName, page: this.currentPage, featured: this.filterFeatured, hightolowprice: this.filterHigh, lowtohighprice: this.filterLow, ztoa: this.filterZ, atoz: this.filterA, oldtonew: this.filterOld, newtoold: this.filterNew, bestseller: this.filterBestseller};
        }
        
        this.dataService.productListing(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.products = data.data;
                    this.totalRecords = data.totalrecords;
                    this.pageTotalPages = this.utilsService.getTotalPages(this.totalRecords, this.pageRecordsPerPage);
                    this.pageNumbers = [];

                    this.pageNumbers = this.utilsService.getPagination(this.currentPage, this.totalRecords, this.pageRecordsPerPage);

                    this.pageLast = this.pageTotalPages;

                    this.pageStart = ((this.currentPage - 1)*this.pageRecordsPerPage)+1;
                    this.pageEnd = this.currentPage * this.pageRecordsPerPage;

                    if(this.pageEnd > this.totalRecords) {
                        this.pageEnd = this.totalRecords;
                    }
                } else {
                    this.totalRecords = 0;
                }
            }
        );
    }

    loadPage(page) {
        this.currentPage = page;
        this.productListing();
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

    addToCart(productID, type){
        if(!this.token){
            this.rString = this.utilsService.randomString(30);
            this.utilsService.saveData("alutoken", this.rString);
            this.token = this.utilsService.getData('alutoken');
        }
        var params = {product_id: productID, quantity: '1', user_id: this.token, type: type};
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

}