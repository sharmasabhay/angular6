import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-useraddress',
  templateUrl: './useraddress.component.html',
  styleUrls: ['./useraddress.component.css']
})
export class UseraddressComponent implements OnInit {

    userId: any;
    details: any[] =[];
    deviceInfo;
    opened: boolean = false;
    status: any;
    userAddress: boolean = true;

    constructor(public dialog: MatDialog, private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute) {
        this.userId = this.utilsService.validateUser();
        var deviceInfo = this.utilsService.getDevice();
        this.deviceInfo = deviceInfo.device;
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
    }

    ngOnInit() {
        this.addressDetails();
    }

    sideMenu(){
        this.opened = !this.opened;
        this.status = !this.status; 
    }

    showAddressPopup() {
        const dialogRef = this.dialog.open(AddAdressDialog, {
            height: '600px',
            width: '800px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(data => {
            this.addressDetails();
        }); 
    }


    EditAddressPopup(index) {
        const dialogRef = this.dialog.open(EditAdressDialog, {
            height: '590px',
            width: '650px',
            disableClose: true,
            data: {index: index}
        });

        dialogRef.afterClosed().subscribe(data => {
            this.addressDetails();
        }); 
    }

    addressDetails(){
        this.userAddress = true;
        var params = {user_id: this.userId};
        this.dataService.addressDetails(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.details = data.data;
                } else {
                    this.userAddress = false;
                }
            }
        );
    }

    deleteAddress(address_id) {
        Swal.fire({
            title: "Are you sure?", 
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }) .then((result) => {
            if (result.value) {
                var params = {user_id: this.userId, index: address_id};
                this.dataService.deleteAddress(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            this.addressDetails();
                        } else {

                        }
                    }
                );
            }
        });
    }

}


@Component({
  selector: 'app-addadressdialog',
  templateUrl: './addressdialog.component.html',
  styleUrls: ['./useraddress.component.css'],
})

export class AddAdressDialog implements OnInit {
    myControl = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    firstaddress:boolean = true;
    bitMore: boolean = false;
    address: any = {};
    userId: any;
    addressList: any [] = [];
    latitude: any = 1.3521;
    longitude: any = 103.8198;
    zoom: number = 12;
    addressMap: any [] = [];
    mapLatitude: any;
    showAfterSelection: boolean = false;
    roadName: any;
    houseName: any;
    selectFirst: boolean = true;
    manualForm: boolean = false;
    manualAddressForm: boolean = false;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, public dialogRef: MatDialogRef<AddAdressDialog>) {
        this.userId = this.utilsService.validateUser();
    }

    @HostListener('window:keyup.esc') onKeyUp() {
        this.dialogRef.close();
    }

    ngOnInit() {

    }

    showsecondAddress(){
       this.firstaddress = false;
       this.bitMore = true;
    }

    backToFirstForm(){
       this.firstaddress = true;
       this.bitMore = false;
       //this.displayFn($event);
    }

    searchAddress(){
        var params = {searchVal: this.address.postalcode};
        this.dataService.addressSearch(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.addressList = data.data.results;
                } else {
                    
                }
            }
        );
    }

    displayFn(selectedLocation) {
        this.address.postal_code =  selectedLocation.option.value.POSTAL;
        this.address.postalcode = selectedLocation.option.value.ADDRESS;
        this.latitude = selectedLocation.option.value.LATITUDE;
        this.longitude = selectedLocation.option.value.LONGITUDE;
        this.address.building_name = selectedLocation.option.value.BUILDING;
        this.roadName = selectedLocation.option.value.ROAD_NAME;
        this.houseName = selectedLocation.option.value.BLK_NO;
        this.showAfterSelection = true;
        this.selectFirst = false;
        console.log(selectedLocation.option.value.POSTAL);
        console.log(selectedLocation);
        //console.log(typeof selectedLocation.option.value.POSTAL) ;
    }

    getOptionText(addressValue) {
       return addressValue.POSTAL;
       console.log(addressValue.POSTAL);
    }

    addAddress(){
         if(this.address.first_name == undefined){
            return false;
        }
        if(this.address.last_name == undefined){
            return false;
        }
        if(this.manualAddressForm == true){
            this.address.postal_code =  this.address.postal;
            this.address.building_name = this.address.building;
            this.roadName = this.address.street;
            this.houseName = this.address.block;
            if(this.address.street == undefined){
                return false;
            }
            if(this.address.postal == undefined){
                return false;
            }
            if(this.address.block == undefined){
                return false;
            }
        }
        var params = {user_id: this.userId, firstname: this.address.first_name, lastname: this.address.last_name, building_name: this.address.building_name, street: this.roadName , postal_code: this.address.postal_code, house_no: this.houseName , floor: this.address.floor, unit: this.address.unit, address: this.address.instructions, default: this.address.default, company_name: this.address.company_name};
        this.dataService.addAddress(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    Swal.fire('Success...', "Address added successfully", 'success');
                    this.dialogRef.close(AddAdressDialog);
                } else {
                    
                }
            }
        );
    }

    manualAddress(){
        this.firstaddress = false;
        this.manualAddressForm = true;
        this.bitMore = true;
    }

}


@Component({
  selector: 'app-editadressdialog',
  templateUrl: './editaddressdialog.component.html',
  styleUrls: ['./useraddress.component.css'],
})
export class EditAdressDialog implements OnInit {

    addressEdit: any = {};
    userId: any;
    editIndex: any;
    userAddress: boolean = true;
    details: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditAdressDialog>) {
        this.userId = this.utilsService.validateUser();
        this.editIndex = this.data.index;
    }

    @HostListener('window:keyup.esc') onKeyUp() {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.singleAddressDetails();
    }

    singleAddressDetails(){
        var params = {user_id: this.userId, index: this.editIndex};
        this.dataService.singleAddressDetails(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.addressEdit.first_name = data.data.firstname;
                    this.addressEdit.last_name = data.data.lastname;
                    this.addressEdit.company_name = data.data.company;
                    this.addressEdit.building_name = data.data.building_name;
                    this.addressEdit.street = data.data.street;
                    this.addressEdit.postal_code = data.data.postal_code;
                    this.addressEdit.house_no = data.data.house_no;
                    this.addressEdit.floor = data.data.floor;
                    this.addressEdit.unit = data.data.unit;
                    this.addressEdit.instructions = data.data.address;
                    this.addressEdit.default = data.data.default;
                    if(this.addressEdit.default == true){
                        this.addressEdit.check = true;
                    } else {
                        this.addressEdit.check = false;
                    }
                } else {
                    
                }
            }
        );
    }

    editAddress(){
        var params = {user_id: this.userId, firstname: this.addressEdit.first_name, lastname: this.addressEdit.last_name, company_name: this.addressEdit.company_name, building_name: this.addressEdit.building_name, street: this.addressEdit.street, postal_code: this.addressEdit.postal_code, house_no: this.addressEdit.house_no, floor: this.addressEdit.floor, unit: this.addressEdit.unit, address: this.addressEdit.instructions, default: this.addressEdit.check, index: this.editIndex};
        this.dataService.editAddress(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    Swal.fire('Success...', "Address edited successfully", 'success');
                    this.dialogRef.close(EditAdressDialog);
                } else {
                    
                }
            }
        );
    }

    addressDetails(){
        this.userAddress = true;
        var params = {user_id: this.userId};
        this.dataService.addressDetails(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.details = data.data;
                } else {
                    this.userAddress = false;
                }
            }
        );
    }

    deleteAddress() {
        Swal.fire({
            title: "Are you sure?", 
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }) .then((result) => {
            if (result.value) {
                console.log(this.editIndex);
                var params = {user_id: this.userId, index: this.editIndex};
                this.dataService.deleteAddress(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            this.dialogRef.close(EditAdressDialog);
                            this.addressDetails();
                        } else {

                        }
                    }
                );
            }
        });
    }
}