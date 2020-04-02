import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

    forgot: any = {};
    forgotField: any;
    error: any;
    success: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
    }

    forgotPassword(){
        var params = {email: this.forgot.email};
        this.dataService.forgotPassword(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.forgotField = data.data;
                    this.forgot = '';
                    this.success = data.message;
                    Swal.fire('Success!!!...', this.success, 'success');
                    this.router.navigate(['/account/login']);
                } else {
                    this.error = data.error;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }

}
