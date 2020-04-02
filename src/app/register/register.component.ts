import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    register: any = {};
    error: any;
    registration: any[] = [];
    success: any;
    popup: any;
    instaPopup: any;
    facebookPopup: any;
    twitterPopup: any;
    gString: any;
    fString: any;
    iString: any;
    tString: any;
    user_id: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        window.scrollTo(0, 0);
    }

    userVerifyEmail(){
        var params = {first_name: this.register.first_name, email: this.register.email, user_id: this.user_id};
        this.dataService.userVerifyEmail(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    Swal.fire({
                        title: 'Verification email send',
                        text: 'Please check your inbox to activate your account and start shopping with us!',
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    });
                    
                } else {
                    this.error = data.error;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }

    userRegistration(){
        console.log(this.register);
        var params = {first_name: this.register.first_name, last_name: this.register.last_name, email: this.register.email, password: this.register.password, repeat_password: this.register.repeat_password};
        this.dataService.userRegistration(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.registration = data.data;
                    this.user_id = data.user_id;
                    this.userVerifyEmail();
                    this.register = {};
                    
                } else {
                    this.error = data.message;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }


    facebookLogin(){
        this.fString = this.utilsService.randomString(10);
        this.facebookPopup = window.open('http://ah.alcoholdelivery.com.sg/facebooklogin?source='+this.fString, 'newwindow', 'width=500, height=600');
        var popupTick = setInterval(() => {
            if (this.popup.closed) {
                clearInterval(popupTick);

                var params = {source: this.fString};
                this.dataService.facebook(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            //this.utilsService.setCookie("aluid", data.data.id);
                            //this.utilsService.setCookie("aluname", data.data.name);
                            //this.router.navigate(['/account']);
                        } else {
                            Swal.fire('Oops!!!...', "Please try again", 'error');
                        }
                    }
                );
            } 
        }, 500);
    }

    googleLogin(){
        this.gString = this.utilsService.randomString(10);
        this.popup = window.open('http://ah.alcoholdelivery.com.sg/googlelogin?source='+this.gString, 'newwindow', 'width=500, height=600');
        
        var popupTick = setInterval(() => {
            if (this.popup.closed) {
                clearInterval(popupTick);
                
                var params = {source: this.gString};
                this.dataService.google(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            this.utilsService.setCookie("aluid", data.data.id);
                            this.utilsService.setCookie("aluname", data.data.name);
                            this.router.navigate(['/account']);
                        } else {
                            Swal.fire('Oops!!!...', "Please try again", 'error');
                        }
                    }
                );
            } 
        }, 500);
    }

    instagramLogin(){
        this.iString = this.utilsService.randomString(10);
        this.instaPopup = window.open('http://ah.alcoholdelivery.com.sg/instagramlogin?instasource='+this.iString, 'newwindow', 'width=450, height=450');
        var popupTick = setInterval(() => {
            if (this.instaPopup.closed) {
                clearInterval(popupTick);

                var params = {instasource: this.iString};
                this.dataService.instagram(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            this.utilsService.setCookie("aluid", data.data.id);
                            this.utilsService.setCookie("aluname", data.data.name);
                            this.router.navigate(['/account']);
                        } else {
                            Swal.fire('Oops!!!...', "Please try again", 'error');
                        }
                    }
                );
            } 
        }, 500);
    }

    twitterLogin(){
        this.tString = this.utilsService.randomString(10);
        this.twitterPopup = window.open('http://ah.alcoholdelivery.com.sg/twitterlogin?twittersource='+this.tString, 'newwindow', 'width=450, height=450');
        var popupTick = setInterval(() => {
            if (this.twitterPopup.closed) {
                clearInterval(popupTick);

                var params = {twittersource: this.tString};
                this.dataService.twitter(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            this.utilsService.setCookie("aluid", data.data.id);
                            this.utilsService.setCookie("aluname", data.data.name);
                            this.router.navigate(['/account']);
                        } else {
                            Swal.fire('Oops!!!...', "Please try again", 'error');
                        }
                    }
                );
            } 
        }, 500);
    }

}
