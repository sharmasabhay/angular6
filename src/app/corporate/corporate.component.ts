import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.css']
})
export class CorporateComponent implements OnInit {

    loading: boolean = false;
    corporate: any = {};
    errorContact: boolean = false;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        window.scrollTo(0, 0);
    }

    corporateAccount(){
        this.errorContact = false;
        if(this.corporate.email == undefined) {
            this.errorContact = true;
            return false;
        }

        this.loading = true;
        var params = {name: this.corporate.name, email: this.corporate.email, company_name: this.corporate.company, business_name: this.corporate.business, phone: this.corporate.phone, comment: this.corporate.message};
        this.dataService.corporateAccount(params)
          .subscribe(
            (data) => {
                this.loading = false;
                if(data.result == "true") {
                    this.corporate.name = '';
                    this.corporate.email = '';
                    this.corporate.company = '';
                    this.corporate.business = '';
                    this.corporate.phone = '';
                    this.corporate.message = '';
                    Swal.fire('Success...', data.message, 'success');
                    
                } else {
                    if(data.error){
                        Swal.fire('Oops!!!', data.error, 'error');
                    }
                }
            }
        );
    }

}
