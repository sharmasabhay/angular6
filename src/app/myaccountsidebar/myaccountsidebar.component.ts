import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myaccountsidebar',
  templateUrl: './myaccountsidebar.component.html',
  styleUrls: ['./myaccountsidebar.component.css']
})
export class MyaccountsidebarComponent implements OnInit {

    userId: any;
    opened: boolean = false;
    status: any;
    deviceInfo;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.userId = this.utilsService.validateUser();
        var deviceInfo = this.utilsService.getDevice();
        this.deviceInfo = deviceInfo.device;
    }

    ngOnInit() {
    }

    sideMenu(){
        this.opened = !this.opened;
        this.status = !this.status; 
    }

}
