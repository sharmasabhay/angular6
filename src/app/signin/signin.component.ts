import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    login: any = {};
    loginUser: any[] = [];
    error: any;
    popup: any;
    instaPopup: any;
    facebookPopup: any;
    twitterPopup: any;
    gString: any;
    fString: any;
    iString: any;
    tString: any;
    shopifyUser: any;
    shopifyUserId: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, private cookieService: CookieService, public dialog: MatDialog) {
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        window.addEventListener('message', function(event) {
           console.log(event.data);
        });
    }

    userLogin(){
        var params = {user_email: this.login.email, user_pass: this.login.password};
        this.dataService.userLogin(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.loginUser = data.data;
                    console.log(this.loginUser);
                    this.shopifyUser = data.shopifycustomer;
                    if(this.shopifyUser == 'yes'){
                        const dialogRef = this.dialog.open(PasswordDialog, {
                            height: '350px',
                            width: '600px',
                            disableClose: true
                        });
                        dialogRef.afterClosed().subscribe(data => {
                            var params = {new_password: data.new, retype_password: data.reenter, user: this.loginUser};
                            this.dataService.createAccount(params)
                              .subscribe(
                                (data) => {
                                    if(data.result == "true") {
                                        this.shopifyUserId = data.user_id;
                                        if(this.shopifyUserId != ''){
                                            this.utilsService.setCookie("aluid", data.user_id);
                                            this.utilsService.setCookie("aluname", data.username);
                                            this.router.navigate(['/account']);
                                        }
                                    } else {
                                        this.error = data.message;
                                        Swal.fire('Oops!!!...', this.error, 'error');
                                    }
                                }
                            );
                        });
                    } else {
                        this.utilsService.setCookie("aluid", data.data.id);
                        this.utilsService.setCookie("aluname", data.data.username);
                        this.router.navigate(['/account']);
                    }
                } else {
                    this.error = data.error;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }

    facebookLogin(){
        this.fString = this.utilsService.randomString(10);
        this.facebookPopup = window.open('http://ah.alcoholdelivery.com.sg/facebooklogin?fbsource='+this.fString, 'newwindow', 'width=500, height=600');
        var popupTick = setInterval(() => {
            if (this.popup.closed) {
                clearInterval(popupTick);

                var params = {fbsource: this.fString};
                this.dataService.facebook(params)
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

@Component({
  selector: 'app-passworddialog',
  templateUrl: './password.component.html',
  styleUrls: ['./signin.component.css'],
})
export class PasswordDialog implements OnInit {

    password: any = {};

    constructor(public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, public dialogRef: MatDialogRef<PasswordDialog>) {}

    ngOnInit() {
        
    }

    createAccount(){
        this.dialogRef.close(this.password);
    }

}
