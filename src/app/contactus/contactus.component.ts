import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

    contact: any = {};
    loading: boolean = false;
    errorContact: boolean = false;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        window.scrollTo(0, 0);
    }

    contactUs(){
        this.errorContact = false;
        if(this.contact.email == undefined) {
            this.errorContact = true;
            return false;
        }
        this.loading = true;
        var params = {name: this.contact.name, email: this.contact.email, phone: this.contact.phone, message: this.contact.message};
        this.dataService.contactUs(params)
          .subscribe(
            (data) => {
                this.loading = false;
                if(data.result == "true") {
                    this.contact.name = '';
                    this.contact.email = '';
                    this.contact.phone = '';
                    this.contact.message = '';
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
