import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    categories: any[] = [];

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.categoryList();
    }

    categoryList(){
        var params = {};
        this.dataService.categoryList(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.categories = data.data;
                } else {
                    
                }
            }
        );
    }
    

}
