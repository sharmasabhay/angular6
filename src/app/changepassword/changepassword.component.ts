import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

    reset: any = {};
    setting: any;
    userId: any;
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
    }

    sideMenu(){
        this.opened = !this.opened;
        this.status = !this.status; 
    }

    changePassword(){
        var params = {user_id: this.userId, current_pass: this.reset.password, new_password: this.reset.new_password};
        this.dataService.changePassword(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    Swal.fire('Success!!!', data.success_message , 'success');
                    this.reset = '';
                } else {
                    
                }
            }
        );
    }

}
