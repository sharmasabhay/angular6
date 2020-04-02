import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

    profile: any = {};
    userId: any;
    success: any;
    error: any;
    deviceInfo;
    opened: boolean = false;
    status: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {
        this.userId = this.utilsService.validateUser();
        if(!this.userId){
            this.router.navigate(['/account/login']);
        }
        var deviceInfo = this.utilsService.getDevice();
        this.deviceInfo = deviceInfo.device;
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
       window.scrollTo(0, 0);
       this.profileSettingDetails();
    }

    sideMenu(){
        this.opened = !this.opened;
        this.status = !this.status; 
    }

    profileSettingDetails(){
        var params = {user_id: this.userId};
        this.dataService.profileSettingDetails(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.profile.name = data.data.username;
                    this.profile.email = data.data.email;
                } else {

                }
            }
        );
    }

    editProfileSetting(){
        var params = {user_id: this.userId, name: this.profile.name, email: this.profile.email, mobile_number: this.profile.phone};
        this.dataService.editProfileSetting(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.success = data.message;
                    Swal.fire('Success...', this.success, 'success');
                } else {
                    this.error = data.error;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }

}
