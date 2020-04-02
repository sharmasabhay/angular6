import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-agedialog',
  templateUrl: './agedialog.component.html',
  styleUrls: ['./agedialog.component.css']
})
export class AgedialogComponent implements OnInit {

    age: any = {};

    constructor(public dataService:DataService, public utilsService:UtilsService, public dialogRef: MatDialogRef<AgedialogComponent>) {
        
    }

    ngOnInit() {
    }

    submitAge(){
        if(this.age == 'yes'){
            this.utilsService.saveData("alulegal", this.age);
            this.dialogRef.close(AgedialogComponent);
        } else if(this.age == 'no') {
            window.history.back();
        }
    }

    closeModal(){
        this.dialogRef.close(AgedialogComponent);
    }

}
