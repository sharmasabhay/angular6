import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verifyaccount',
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.css']
})
export class VerifyaccountComponent implements OnInit {

    verfifiedMsg: boolean = false;
    error: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            if(params.user_id) {
              this.varifyAccount(params.user_id);   
            } else {
              this.router.navigate(['/home']);
            }
        });
    }

    varifyAccount(userId){
        var params = {user_id: userId};
        this.dataService.varifyAccount(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.utilsService.setCookie("aluid", userId);
                    this.utilsService.setCookie("aluname", data.username);
                    this.router.navigate(['/account']);
                } else {
                    this.error = data.message;
                    Swal.fire('Oops!!!...', this.error, 'error');
                    Swal.fire({
                      text: this.error,
                      type: 'error',
                      showCancelButton: false,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Ok'
                    }) .then((result) => {
                        this.router.navigate(['/account/register']);
                    });
                }
            }
        );
    }

}
