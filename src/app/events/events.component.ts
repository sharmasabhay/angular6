import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

    event: any = {};
    loading: boolean = false;
    errorName: boolean = false;
    errorEmail: boolean = false;
    errorDate: boolean = false;
    errorPhone: boolean = false;
    errorLocation: boolean = false;
    errorComment: boolean = false;
    errorTime: boolean = false;
    fromTime: any;
    toTime: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        window.scrollTo(0, 0);
    }

    eventForm(){

        if(this.event.name == undefined) {
            this.errorName = true;
            return false;
        } else {
            this.errorName = false;
        }
        if(this.event.email == undefined) {
            this.errorEmail = true;
            return false;
        } else {
           this.errorEmail = false;
        }
        if(this.event.date == undefined) {
            this.errorDate = true;
            return false;
        } else {
            this.errorDate = false;
        }

        if(this.event.from_hour == undefined || this.event.from_min == undefined || this.event.to_hour == undefined || this.event.to_min == undefined) {
            this.errorTime = true;
            return false;
        } else {
            this.errorTime = false;
        }

        if(this.event.phone == undefined) {
            this.errorPhone = true;
            return false;
        } else {
            this.errorPhone = false;
        }
        if(this.event.location == undefined) {
            this.errorLocation = true;
            return false;
        } else {
            this.errorLocation = false;
        }
        if(this.event.comment == undefined) {
            this.errorComment = true;
            return false;
        } else {
            this.errorComment = false;
        }

        this.fromTime = this.event.from_hour + ':' + this.event.from_min;
        this.toTime = this.event.to_hour + ':' + this.event.to_min;

        this.loading = true;
        var params = {name: this.event.name, email: this.event.email, company_name: this.event.company, event_date: this.event.date, phone: this.event.phone, need: this.event.comment, event_location: this.event.location, pax: this.event.pax, fromtime: this.fromTime, totime: this.toTime };
        this.dataService.eventForm(params)
          .subscribe(
            (data) => {
                this.loading = false;
                if(data.result == "true") {
                    this.event.name = '';
                    this.event.email = '';
                    this.event.company = '';
                    this.event.date = '';
                    this.event.location = '';
                    this.event.pax = '';
                    this.event.phone = '';
                    this.event.comment = '';
                    this.event.from_hour = '';
                    this.event.from_min = '';
                    this.event.to_hour = '';
                    this.event.to_min = '';
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
