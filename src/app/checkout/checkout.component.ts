import { Component, OnInit, Inject, ViewChild, Output, EventEmitter, HostListener } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import {MatStepper} from '@angular/material';
import {Pipe, PipeTransform} from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
   providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
@Pipe({name: 'number'})
export class CheckoutComponent implements OnInit {
    ProductConfig: any;
    nextProductConfig: any;
    color = 'accent';
    checked = false;
    disabled = false;
    nextdaydelivery: boolean = false;
    samedaydelivery: boolean = false;
    twohoursdelivery: boolean = false;
    userId: any;
    cartList: any[] = [];
    totalCart: any;
    checkout: any = {};
    totalCartAmount: any;
    discountAmount: number = 0;
    afterDiscountAmount: any;
    products: any[] = [];
    promoPrice: boolean = true;
    loader: boolean = false;
    checkoutForm: boolean = true;
    success: any;
    error: any;
    cartDeleted: any;
    deliveryCharge: any = 10.00;
    remainingPromoPrice: any;
    allowPromoProducts: any;
    hurryMessage: boolean = true;
    anotherDiscount: boolean = false;
    nextRemainingPromoPrice: any;
    nextAllowPromoProducts: any;
    nextHurryMessage: boolean = true;
    nextPromoPrice: boolean = true;
    activeLink: string = '1';
    details: any[] = [];
    token: any;
    errorMessage: boolean = false;
    couponSection: boolean = true;
    afterCoupon: boolean = false;
    couponDiscount: boolean = false;
    activeTime: any;
    currentDate: any;
    nextWeek: any[] = [];
    currentWeek: any;
    weekOne: any;
    activeDay: string = '0';
    activeSlot: any;
    activeSameDaySlot: any;
    activeHourSlot: any;
    creditCard: boolean = false;
    activePayment: string = '1';
    creditOption: boolean = false;
    deliveryAddress: any;
    paymentType: any;
    checkoutPaymentType: any;
    @ViewChild('stepper') stepper: MatStepper;
    selectedTimeSlot: any;
    deliveryType: any;
    scheduledTime: any;
    deliveryCharges: any;
    deliveryChargeNext: any;
    dateOfDelivery: any;
    timeOfDelivery: any;
    orderId: any;
    time: any;
    paymentDone: boolean = false;
    isLinear: boolean = true;
    currentStep: number = 1;
    backStep2: boolean = false;
    backStep3: boolean = false;
    backStep4: boolean = false;
    backStep5: boolean = false;
    greatDeal: any[] = [];
    amazing: any[] = [];
    ablePromotionProducts: any;
    amazingAlready: any;
    greatAlready: any;
    alreadyAddedAmazing: boolean = true;
    alreadyAddedGreat: boolean = true;
    errorContact: boolean = false;
    deviceInfo;
    checkoutCoupon: any[] = [];
    checkoutInvoiceCoupon: any[] = [];
    giftCertificate: any;
    updateList: any[] = [];
    alreadyUsedMessage: boolean = false;
    activeDelivery: any;
    notManual: boolean = true;
    manualStartTime: any;
    manualEndTime: any;
    manualTime: boolean = false;
    creditCardRadio: boolean = false;
    creditCardOption: boolean = false;
    cvvSection: any;
    remainingShopping: any;
    snackbar: boolean = true;
    cardList: any[] = [];
    cardNumber: any[] = [];
    cardcvv: any[] = [];
    checkoutCardNo: any;
    checkoutExpDate: any;
    checkoutCVV: any;
    checkoutHolderName: any;
    profile: any = {};
    cardCharges: any;
    expDate: any;
    checkoutStreet: any;
    checkoutPostal: any;
    checkoutBuilding: any;
    checkoutHouse: any;
    checkoutFloor: any;
    checkoutUnit: any;
    checkoutFirstname: any;
    checkoutLastname: any;
    checkoutAddress: any;
    checkoutDelivery: any;
    checkoutCompany: any;
    smokeCharges: any;
    nextSunday: any;
    nextMonday: any;
    nextTuesday: any;
    nextWednesday: any;
    nextThursday: any;
    nextFriday: any;
    nextSaturday: any;
    paymentProcessType: any;
    paymentRedirectUrl: any;
    cardType: any;
    invalidCard: boolean = false;
    cardNumberRequired: boolean = false;
    cvvNumberRequired: boolean = false;
    cvvRequired: boolean = false;
    singleDateDisabled: boolean = false;
    timeZone: any;
    weekend: any;
    weekendOn: boolean = false;
    typeOfCard: any;
    cardLength: any;
    digitError: boolean = false;
    digitAmexError: boolean = false;
    cardHolderRequired: boolean = false;
    ExpMonthRequired: boolean = false;
    ExpYearRequired: boolean = false;
    roundBefore: any;
    roundAfter: any;
    specificTimeCharge: any = 0.00;
    totalCharges: any;
    defaultAddress: any;
    activeAddress: any;
    specificTimeText: any;
    needSpecificTime: boolean = true;
    cancelSpecificTimeSection: boolean = false;
    userAddress: boolean = true;
    addressDelivery: any;
    minDate: any;
    disableTime: boolean = false;
    scheduledDelivery: any;
    between: any;
    tooltipMode: any;
    cartTotal: any;
    cartId: any;
    orderinvoiceData: any;
    backStep1: boolean = true;
    orderDeliveryType: any;
    orderNumberOfAddress: any;
    laststepAddress: any;
    customShipping: boolean = false;
    customShippingText: any;
    customShippingPrice: any;
    customDiscount: boolean = false;
    customDiscountText: any;
    customDiscountPrice: any;
    shippingStatus: any;
    slotSlug: any;
    slotKey: any;
    creditcardList: any[] = [];
    dateOfOrder: any;
    dayIndex: any;
    weekCycle: boolean = false;
    changeDate: any;
    couponCodeText: any;
    errorMessageShow: any;
    tier: any;
    bulkPrice: any;
    removeDisable: boolean = false;
    minDateNext: any;
    specificPopup: any;
    onlyManual: boolean = false;
    specificDate: any;
    dateManualTime: any;
    cartID: any;
    cartProductId: any [] = [];

    constructor(public dialog: MatDialog, private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, public datepipe: DatePipe) {
        this.userId = this.utilsService.validateUser();
        this.token = this.utilsService.getData('alutoken');
        this.checkout.smoke = false;
        this.checkout.leaveatdoor = false;
        this.checkout.instructions = '';
        this.checkout.smokeDetail = '';
        if(this.checkout.smoke == true){
            this.smokeCharges = 4.00;
        } else {
            this.smokeCharges = 0.00;
        }
        if(!this.userId){
            this.router.navigate(['/account/login']);
        }
        this.currentDate = new Date();

        if(this.activePayment == '2'){
            this.paymentType = 'Credit Card';
            this.checkoutPaymentType = 'CARD';
        } else {
            this.paymentType = 'Cash on delivery';
            this.checkoutPaymentType = 'COD';
        }
        var deviceInfo = this.utilsService.getDevice();
        this.deviceInfo = deviceInfo.device;
        if(this.deviceInfo == 'desktop'){
            this.ProductConfig = {"slidesToShow": 4, "slidesToScroll": 1, "arrows": true};
            this.nextProductConfig = {"slidesToShow": 4, "slidesToScroll": 1, "arrows": true};
        } else if(this.deviceInfo == 'tablet'){
            this.ProductConfig = {"slidesToShow": 3, "slidesToScroll": 1, "arrows": true};
            this.nextProductConfig = {"slidesToShow": 3, "slidesToScroll": 1, "arrows": true};
        } else {
            this.ProductConfig = {"slidesToShow": 2, "slidesToScroll": 1, "arrows": true};
            this.nextProductConfig = {"slidesToShow": 2, "slidesToScroll": 1, "arrows": true};
        }
        window.scrollTo(0, 0);
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
        this.cartId = this.activatedRoute.snapshot.paramMap.get('id');
        this.saveCardList();
        if(this.router.url == "/checkout/"+this.cartId){
            this.currentStep = 5;
            this.backStep1 = false;
            this.backStep2 = true;
            this.backStep3 = true;
            this.backStep4 = true;
            this.orderInvoice();
        }
    }

    ngOnInit() {
      window.scrollTo(0, 0);
      if(this.router.url != "/checkout/"+this.cartId){
        this.myCart();
      }
      if(!this.weekCycle){
          this.weekDatesFunction();
      }
      this.addressDetails();
      this.greatDealPromotions();
      this.amazingPromotions();
      this.checkout.date = new Date(new Date().setDate(new Date().getDate() + 1));
      this.checkout.singledate = new Date();
      this.checkout.singlehour = new Date();
      this.currentWeek = this.nextWeek;
      this.profileSettingDetails();
      this.singaporeTimezone();
      this.minDate = new Date(new Date().setDate(new Date().getDate() + 1));
      this.minDateNext = new Date();
    }

    weekDatesFunction(){
        var datatoday = new Date();
        var datatodays = datatoday.setDate(new Date(datatoday).getDate() + 1);
        var todate = new Date(datatodays);

        var datatodays2 = datatoday.setDate(new Date(datatoday).getDate() + 1);
        var todate2 = new Date(datatodays2);

        var datatodays3 = datatoday.setDate(new Date(datatoday).getDate() + 1);
        var todate3 = new Date(datatodays3);

        var datatodays4 = datatoday.setDate(new Date(datatoday).getDate() + 1);
        var todate4 = new Date(datatodays4);

        var datatodays5 = datatoday.setDate(new Date(datatoday).getDate() + 1);
        var todate5 = new Date(datatodays5);

        var datatodays6 = datatoday.setDate(new Date(datatoday).getDate() + 1);
        var todate6 = new Date(datatodays6);

        var datatodays7 = datatoday.setDate(new Date(datatoday).getDate() + 1);
        var todate7 = new Date(datatodays7);

        this.nextSunday = todate;
        this.nextMonday = todate2;
        this.nextTuesday = todate3;
        this.nextWednesday = todate4;
        this.nextThursday = todate5;
        this.nextFriday = todate6;
        this.nextSaturday = todate7;

        this.nextWeek.push(this.nextSunday, this.nextMonday, this.nextTuesday, this.nextWednesday, this.nextThursday, this.nextFriday, this.nextSaturday);
    }

    closeSnackBar(){
        this.snackbar = false;
    }

    singaporeTimezone(){
        var params = {};
        this.dataService.singaporeTimezone(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.timeZone = data.time;
                    this.weekend = data.weekend;
                } else {
                    this.timeZone = data.time;
                }
            }
        );
    }

    orderInvoice(){
        this.weekCycle = true;
        var params = {user_id: this.userId, cartId: this.cartId};
        this.dataService.orderInvoice(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    if(data.data.id != null){
                        this.cartList = data.data.products;
                        this.orderinvoiceData = data.data;
                        this.orderDeliveryType = data.data.delivery['type'];
                        this.checkout.instructions = data.data.delivery['instructions'];
                        this.checkout.leaveatdoor = data.data.delivery['leaveatdoor'];
                        this.totalCart = data.data.payment['subtotal'];
                        this.totalCartAmount = data.data.payment['total'];
                        this.shippingStatus = data.data.shipping['status'];
                        this.slotSlug = data.data.timeslot['slotslug'];
                        if(data.data.cardindex != null){
                           this.saveCreditCard(this.creditcardList[data.data.cardindex]);
                        }
                        //this.creditcardList[0].cvvnew = data.data.payment.creditCard['cvc'];
                        this.dateOfOrder = data.data.timeslot['slug'];
                        this.dayIndex = data.data.day;
                        this.activeDay = '0';
                        this.checkout.date = this.dateOfOrder;
                        var datatoday = new Date(this.dateOfOrder);
                        var datatodays = datatoday.setDate(new Date(datatoday).getDate());
                        var todate = new Date(datatodays);

                        var datatodays2 = datatoday.setDate(new Date(datatoday).getDate() + 1);
                        var todate2 = new Date(datatodays2);

                        var datatodays3 = datatoday.setDate(new Date(datatoday).getDate() + 1);
                        var todate3 = new Date(datatodays3);

                        var datatodays4 = datatoday.setDate(new Date(datatoday).getDate() + 1);
                        var todate4 = new Date(datatodays4);

                        var datatodays5 = datatoday.setDate(new Date(datatoday).getDate() + 1);
                        var todate5 = new Date(datatodays5);

                        var datatodays6 = datatoday.setDate(new Date(datatoday).getDate() + 1);
                        var todate6 = new Date(datatodays6);

                        var datatodays7 = datatoday.setDate(new Date(datatoday).getDate() + 1);
                        var todate7 = new Date(datatodays7);

                        this.nextSunday = todate;
                        this.nextMonday = todate2;
                        this.nextTuesday = todate3;
                        this.nextWednesday = todate4;
                        this.nextThursday = todate5;
                        this.nextFriday = todate6;
                        this.nextSaturday = todate7;

                        this.nextWeek.push(this.nextSunday, this.nextMonday, this.nextTuesday, this.nextWednesday, this.nextThursday, this.nextFriday, this.nextSaturday);


                        /* Active address */
                        this.orderNumberOfAddress = data.data.delivery.address['key'];
                        this.activeAddress = this.orderNumberOfAddress;
                        this.chooseAddress(this.orderNumberOfAddress);
                        this.deliveryAddress = data.data.delivery.address['detail'];

                        /* Coupon discount */
                        if(data.data.couponCode_id){
                           this.couponDiscount = true;
                           this.discountAmount = data.data.coupon['discount'];
                           this.couponCodeText = data.data.coupon['code'];
                           this.checkoutInvoiceCoupon = data.data.coupon;
                        }
                        this.deliveryCharge = data.data.delivery['charges'];

                        /* Custom shipping */
                        if(data.data.shipping['status'] == true){
                            this.customShipping = true;
                            this.customShippingText = data.data.shipping['label'];
                            this.customShippingPrice = data.data.shipping['value'];
                        }

                        /* Custom discount */
                        if(data.data.custom_discount['status'] == true){
                            this.customDiscount = true;
                            this.customDiscountText = data.data.custom_discount['label'];
                            this.customDiscountPrice = data.data.custom_discount['value'];
                        }
       
                        /* Payment method */
                        if(data.data.payment['method'] == 'COD'){
                            this.activePayment = '1';
                            this.paymentType = 'Cash on delivery';
                            this.checkoutPaymentType = 'COD';
                            this.creditCardOption = false;
                        } else {
                            this.activePayment = '2';
                            this.paymentType = 'Credit Card';
                            this.checkoutPaymentType = 'CARD';
                            this.creditCardOption = true;
                        }

                        /* Delivery type */
                        if(data.data.delivery.type == '1'){
                            this.specificTimeText = 'Next Day Delivery';
                            this.nextDayDelivery();
                            this.chooseSlot(data.data.timeslot['slotslug'], this.activeDay);
                            if(data.data.service.specific_time_delivery['status'] == false){
                                this.specificTimeCharge = parseFloat('0.00');
                                this.scheduledDelivery == 'NEXT DAY delivery';
                                this.tooltipMode = 'NEXT DAY delivery';

                                if(this.slotSlug == '12:30pm - 4:00pm'){
                                    this.slotKey = '0';
                                } else if(this.slotSlug == '4:00pm - 8:00pm') {
                                    this.slotKey = '1';
                                } else {
                                    this.slotKey = '2';
                                }
                            } else {
                                this.specificTimeCharge = parseFloat(data.data.service.specific_time_delivery['charges']);
                                this.scheduledDelivery == 'NEXT DAY delivery with specific time selection';
                                this.tooltipMode = 'Orders placed before 2359HOURS will be delivered the next day within a 1 hour time range you have selected for an additional $19.90';
                                this.slotKey = '-1';
                            }
                            this.activeTime = '1';
                            
                        }
                        if(data.data.delivery.type == '0'){
                            this.specificTimeText = 'Same Day Delivery Charge';
                            this.sameDayDelivery();
                            this.specificTimeCharge = parseFloat(data.data.service.same_day_delivery['charges']);
                            this.scheduledDelivery == 'SAME DAY delivery';
                            this.chooseSameDaySlot(data.data.timeslot['slotslug']);
                            this.tooltipMode = 'Orders will be sent within the day if orders are placed before 2pm for an additional $5.';
                            this.checkout.singledate = data.data.timeslot['slug'];
                            this.activeTime = '2';

                            if(this.slotSlug == '2:00pm - 7:00pm'){
                                this.slotKey = '0';
                            } else {
                                this.slotKey = '1';
                            }
                        }
                        if(data.data.delivery.type == '2'){
                            this.specificTimeText = '2-Hour Delivery Charge';
                            this.twohoursDayDelivery();
                            this.specificTimeCharge = parseFloat(data.data.service.two_hours_delivery['charges']);
                            this.scheduledDelivery == '2 HOUR delivery';
                            this.chooseHourSlot(data.data.timeslot['slotslug']);
                            this.tooltipMode = 'Orders will be sent within 2 hours for an additional $19.90.';
                            this.checkout.singledate = data.data.timeslot['slug'];
                            this.activeTime = '3';

                            if(this.slotSlug == 'Next 2 hours'){
                                this.slotKey = '-1';
                            } else if(this.slotSlug == '12:00pm - 2:00pm'){
                                this.slotKey = '0';
                            } else if(this.slotSlug == '2:00pm - 4:00pm'){
                                this.slotKey = '1';
                            } else if(this.slotSlug == '4:00pm - 6:00pm'){
                                this.slotKey = '2';
                            } else {
                                this.slotKey = '3';
                            }
                        }
                        
                        if(this.orderDeliveryType != 3){
                            this.activeDelivery = '1';
                        } else {
                            this.activeDelivery = '2';
                            this.chooseDelivery(this.activeDelivery);
                            this.scheduledDelivery == 'Store pickup';
                            this.tooltipMode = 'Drop by to our location to pick you order up !';
                        }

                        if(this.activeDelivery == '1') {
                            this.laststepAddress = true;
                        } else {
                            this.laststepAddress = false;
                        }
                    } else {
                        this.router.navigate(['/home']);
                    } 


                } else {

                }
            }
        );
    }

    chooseDelivery(delivery) {
        this.activeDelivery = delivery;
        this.scheduledDelivery = 'Store pickup'; 
        this.selectedTimeSlot = new Date();
        this.between = '';
        this.activeSlot = '';
        if(delivery == '2'){
           this.scheduledTime = 'Store pickup';
           if(this.orderinvoiceData){
                this.deliveryCharge = parseFloat('0.00');
                this.specificTimeCharge = parseFloat('0.00');
                this.totalCartAmount = parseFloat(this.totalCartAmount) - parseFloat('10.00');
                if(this.orderinvoiceData.service.specific_time_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('19.90');
                }
                if(this.orderinvoiceData.service.same_day_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('5.00');
                }
                if(this.orderinvoiceData.service.two_hours_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('19.90');
                }
           }
        }
    }


    move(index: number) {
      this.stepper.selectedIndex = index;
    }

    showPopup() {
        const dialogRef = this.dialog.open(CheckoutDialog, {
            height: '520px',
            width: '700px',
            disableClose: true,
            panelClass: 'checkoutdialog'
        });

        dialogRef.afterClosed().subscribe(data => {
            window.scrollTo(0, 0);
            if(data == 'continue'){
                this.currentStep = 2;
            } else {
                this.currentStep = 1;
                this.backStep2 = true;
                this.myCart();
            }
        }); 
    }

    showAddressPopup() {
        const dialogRef = this.dialog.open(AddAddressDialog, {
            height: '600px',
            width: '800px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(data => {
            this.addressDetails();
        }); 
    }
    
    showGiftPopup() {
        const dialogRef = this.dialog.open(GiftDialog, {
            height: '300px',
            width: '600px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(data => {
            
        }); 
    }

    EditAddressPopup(index) {
        const dialogRef = this.dialog.open(EditAddressDialog, {
            height: '590px',
            width: '650px',
            disableClose: true,
            data: {index: index}
        });

        dialogRef.afterClosed().subscribe(data => {
            this.addressDetails();
        }); 
    }

    activeStep(step) {
        window.scrollTo(0, 0);
        this.currentStep = step;
        if(step == 5){
            this.backStep2 = true;
            this.backStep3 = true;
            this.backStep4 = true;
        }

        if(step == 4){
            this.backStep5 = true;
        }

        if(step == 1){
            if(this.activeDelivery == '1'){
                this.backStep3 = true;
                this.backStep2 = true;
            } else {
                this.backStep2 = true;
            }
        }
 
    }

    backFromFour(){
        if(this.activeDelivery == '1'){
            this.currentStep = 3;
        } else {
            this.currentStep = 2;
        }
        
    }

    cancelSpecificTime(){
        this.time = '';
        this.notManual = true;
        this.manualTime = false;
        this.needSpecificTime = true;
        this.cancelSpecificTimeSection = false;
        this.manualStartTime = undefined;
        this.manualEndTime = undefined;
    }


    nextDayDelivery(){
       this.nextdaydelivery = true;
       this.samedaydelivery= false;
       this.twohoursdelivery= false;

    }

    sameDayDelivery(){
       this.cancelSpecificTime();
       this.nextdaydelivery = false;
       this.samedaydelivery= true;
       this.twohoursdelivery= false;
       /*if(this.timeZone > '14:00:00' && this.weekend){
           var cDate = new Date();
           var nextDate = cDate.setDate(new Date(cDate).getDate() + 1);
           var showDate = new Date(nextDate);
           this.checkout.singledate = showDate;
           this.singleDateDisabled = true;
       } else {
           this.checkout.singledate = new Date();
           this.singleDateDisabled = false;
       }*/

       if(this.timeZone > '15:00:00'){
           this.disableTime = true;
       }
       console.log(this.checkout.singledate);
    }

    warningPopup(){
        Swal.fire('Oops!!!', 'SAME DAY DELIVERY service is only availabe daily for orders placed before 2pm!', 'error');
    }

    twohoursDayDelivery(){
      this.cancelSpecificTime();
      this.nextdaydelivery = false;
      this.samedaydelivery= false;
      this.twohoursdelivery= true;
      if(this.timeZone >= '15:00:00' && this.weekend){
          this.weekendOn = true;
      } else{
          this.weekendOn = false;
      }
    }

    twoHoursCondition(){
        Swal.fire('Oops!!!', 'The service is available Monday - Friday last order at 7pm (arriving latest by 9pm). Saturday and Sunday last order at 3pm (arriving latest by 5pm)', 'error');
    }

    SetDeliveryTimePopup() {
        const dialogRef = this.dialog.open(SetDeliveryTimeDialog, {
            height: '630px',
            width: '600px',
            disableClose: true
        });
        this.onlyManual = true;

        dialogRef.afterClosed().subscribe(data => {
            this.time = data.startTime + 'PM - ' + data.endTime + 'PM';
            this.manualStartTime = data.startTime;
            this.manualEndTime = data.endTime;
            this.activeSlot = this.manualStartTime + '-' + this.manualEndTime;
            this.slotKey = '-1';
            if(data.startTime != undefined && data.endTime != undefined){
               this.notManual = false;
               this.manualTime = true;
               if(this.totalCart < 100){
                   this.deliveryCharge = parseFloat('10.00');
                   this.specificTimeCharge = parseFloat('19.90');
                   this.specificTimeText = 'Specific Time Charge';
               } else {
                   this.deliveryCharge = parseFloat('0.00');
               }
               this.totalCartAmount = parseFloat(this.totalCart) + parseFloat(this.deliveryCharge) + parseFloat(this.specificTimeCharge);
               
            } else {
               this.notManual = true;
               this.manualTime = false;
            }
            if(data.close == true){
               this.cancelSpecificTimeSection =  true;
               this.needSpecificTime = false;
            } else {
                this.cancelSpecificTimeSection =  false;
                this.needSpecificTime = true;
            }
            this.selectedTimeSlot = this.checkout.date;
            this.scheduledDelivery = 'NEXT DAY delivery with specific time selection';
            this.between = 'between';
        });
    }

    myCart(){
        this.loader = true;
        this.checkoutForm = false;
        var params = {user_id: this.token};
        this.dataService.myCart(params)
          .subscribe(
            (data) => {
                this.loader = false;
                this.checkoutForm = true;
                if(data.result == "true") {
                    this.cartList = data.data;
                    this.totalCart = data.total_price;
                    this.tier = data.data.bulk_price;
                    this.bulkPrice = data.data.bulkDisable;
                    if(this.totalCart < 100.00){
                        this.deliveryCharge = 10.00;
                        this.remainingShopping = 100.00 - this.totalCart;
                        this.totalCartAmount = this.totalCart + this.deliveryCharge;
                    } else {
                        this.deliveryCharge = 0.00;
                        this.totalCartAmount = parseFloat(this.totalCart).toFixed(2);
                    }
                    this.remainingPromoPrice = (59.00 - this.totalCart).toFixed(2);
                    if(this.totalCart >= 59.00){
                        this.hurryMessage = false;
                        this.allowPromoProducts = true;
                        this.alreadyAddedGreat = false;
                        this.anotherDiscount = true;
                    }

                    this.nextRemainingPromoPrice = (124.00 - this.totalCart).toFixed(2);
                    if(this.totalCart >= 124.00){
                        this.nextHurryMessage = false;
                        this.nextAllowPromoProducts = true;
                        this.alreadyAddedAmazing = false;
                        this.nextPromoPrice = false;
                    }
                    for(var loop = 0; loop < this.cartList.length; loop++) {
                        if(this.cartList[loop]['bulkDisable'] == 0){
                            if(this.cartList[loop]['quantity'] > 1 && this.cartList[loop]['quantity'] < 6 ){
                                this.cartList[loop]['single_price'] = this.cartList[loop]['bulk_price'][0]['smartPrice'];

                                this.cartList[loop]['price'] = (this.cartList[loop]['quantity'] * this.cartList[loop]['bulk_price'][0]['smartPrice']).toFixed(2);
                            } else if(this.cartList[loop]['quantity'] > 5 && this.cartList[loop]['quantity'] < 11){
                                this.cartList[loop]['single_price'] = this.cartList[loop]['bulk_price'][1]['smartPrice'];
                                this.cartList[loop]['price'] = (this.cartList[loop]['quantity'] * this.cartList[loop]['bulk_price'][1]['smartPrice']).toFixed(2);
                            }
                        }
                    }

                } else {
                    this.router.navigate(['/home']);
                }
            }
        );
    }

    updateMyCart(){
        var params = {user_id: this.token};
        this.dataService.myCart(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.cartList = data.data;
                    this.totalCart = data.total_price;
                    if(this.totalCart < 100.00){
                        this.deliveryCharge = 10.00;
                        this.remainingShopping = 100.00 - this.totalCart;
                        this.totalCartAmount = this.totalCart + this.deliveryCharge;
                    } else {
                        this.deliveryCharge = 0.00;
                        this.totalCartAmount = parseFloat(this.totalCart).toFixed(2);
                    }
                    this.remainingPromoPrice = (59.00 - this.totalCart).toFixed(2);
                    if(this.totalCart >= 59.00){
                        this.hurryMessage = false;
                        this.allowPromoProducts = true;
                        this.alreadyAddedGreat = false;
                        this.anotherDiscount = true;
                    }

                    this.nextRemainingPromoPrice = (124.00 - this.totalCart).toFixed(2);
                    if(this.totalCart >= 124.00){
                        this.nextHurryMessage = false;
                        this.nextAllowPromoProducts = true;
                        this.alreadyAddedAmazing = false;
                        this.nextPromoPrice = false;
                    }

                } else {
                    
                }
            }
        );
    }

    couponCode(){
        this.errorMessage = false;
        this.alreadyUsedMessage = false;
        this.afterCoupon = false;
        this.couponSection = true;
        this.couponDiscount = false;
        var params = {user_id: this.userId, code: this.checkout.coupon_code,total_productprice: this.totalCartAmount};
        this.dataService.couponCode(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.checkoutCoupon = data.data;
                    this.discountAmount = data.data.discount;
                    this.afterDiscountAmount = data.data.totalDiscount;
                    this.couponSection = false;
                    this.afterCoupon = true;
                    this.couponDiscount = true;
                    this.totalCartAmount = this.totalCartAmount - this.discountAmount;
                } else {
                    if(data.error){
                        this.errorMessage = true;
                        this.errorMessageShow = data.error;
                    }
                }
            }    
        );
    }

    removeCouponCode(){
        this.couponSection = true;
        this.afterCoupon = false;
        this.couponDiscount = false;
        this.totalCartAmount = this.totalCartAmount + this.discountAmount;
    }

    deleteCart(product_ID, wrapperId, promotion){
        Swal.fire({
            title: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }) .then((result) => {
            if (result.value) {
                var params = {product_id: product_ID, user_id: this.token, gift_wrapperid: wrapperId, promo: promotion};
                this.dataService.deleteCart(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            this.myCart();
                            this.greatDealPromotions();
                            this.amazingPromotions();
                        } else {

                        }
                    }
                );
            }
        });
    }

    addToCartPromo(productID, promo, discountedPrice, type){
        var params = {product_id: productID, quantity: '1', user_id: this.token, promotion: promo, discounted_price: discountedPrice, type: type};
        this.dataService.addToCartPromotion(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.success = data.message;
                    Swal.fire('Success...', this.success, 'success');
                    this.ablePromotionProducts = promo;
                    this.myCart();
                    this.greatDealPromotions();
                    this.amazingPromotions();
                } else {
                    this.error = data.message;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }

    addWishlist(productID){
        var params = {user_id: this.userId, product_id: productID};
        this.dataService.addWishlist(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.success = data.message;
                    Swal.fire('Success...', this.success, 'success');
                } else {
                    this.error = data.message;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }

    skipStep3(){
        window.scrollTo(0, 0);
        this.errorContact = false;
        if(this.activeDelivery == undefined){
            Swal.fire('Oops!!!', 'Please choose delivery option', 'error');
            return false;
        } else if(this.activeDelivery == '2'){
            this.currentStep = 4;
            this.backStep3 = false;
            this.laststepAddress = false;
        } else if(this.activeDelivery == '1') {
           if(this.activeAddress != undefined){
               this.currentStep = 3;
               this.backStep2 = true;
               this.backStep3 = true;
               this.deliveryAddress = this.details[this.activeAddress];
               this.laststepAddress = true;
           } else {
              Swal.fire('Oops!!!', 'Please add your address', 'error');
              this.currentStep = 2;
           }
        }
    }

    updateCart(){
        var params = {user_id: this.token, products: this.cartList, promo: 'false'};
        this.dataService.updateCart(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.updateList = data.data;
                    this.success = data.message;
                    this.updateMyCart();
                } else {
                    
                }
            }
        );
    }

    onIncrement(list) {
        list['quantity'] = parseInt(list['quantity']) + 1;
        
        /*if(list['quantity'] == 1){
            list['single_price'] = list['single_price'];
            list['quantity'] = parseInt(list['quantity']) + 1;
            list['price'] = list['price'];
        } else if(list['quantity'] > 1 && list['quantity'] < 6){
            list['single_price'] = list['bulk_price'][0]['smartPrice'];
            list['price'] = (list['quantity'] * list['bulk_price'][0]['smartPrice']).toFixed(2);
        } else if(list['quantity'] > 5 && list['quantity'] < 11){
            list['single_price'] = list['bulk_price'][0]['smartPrice'];
            list['price'] = (list['quantity'] * list['bulk_price'][1]['smartPrice']).toFixed(2);
        } */

        this.remainingPromoPrice = (59.00 - this.totalCart).toFixed(2);
        if(this.totalCart >= 59.00){
            this.hurryMessage = false;
            this.allowPromoProducts = true;
            this.alreadyAddedGreat = false;
            this.anotherDiscount = true;
        }

        this.nextRemainingPromoPrice = (124.00 - this.totalCart).toFixed(2);
        if(this.totalCart >= 124.00){
            this.nextHurryMessage = false;
            this.nextAllowPromoProducts = true;
            this.alreadyAddedAmazing = false;
            this.nextPromoPrice = false;
        }
        this.updateCart();
    } 

    onDecrement(list) {
        if(list['quantity'] > 1){
            list['quantity'] = parseInt(list['quantity']) - 1;
        }

        this.remainingPromoPrice = (59.00 - this.totalCart).toFixed(2);
        if(this.totalCart >= 59.00){
            this.hurryMessage = false;
            this.allowPromoProducts = true;
            this.alreadyAddedGreat = false;
            this.anotherDiscount = true;
        } else {
            this.hurryMessage = true;
            this.allowPromoProducts = false;
            this.alreadyAddedGreat = true;
            this.anotherDiscount = false;
        }

        this.nextRemainingPromoPrice = (124.00 - this.totalCart).toFixed(2);
        if(this.totalCart >= 124.00){
            this.nextHurryMessage = false;
            this.nextAllowPromoProducts = true;
            this.alreadyAddedAmazing = false;
            this.nextPromoPrice = false;
        } else {
            this.nextHurryMessage = true;
            this.nextAllowPromoProducts = false;
            this.alreadyAddedAmazing = true;
            this.nextPromoPrice = true;
        }

        if(list['quantity'] == 0){
            var params = {product_id: list['id'], user_id: this.token};
            this.dataService.deleteCart(params)
              .subscribe(
                (data) => {
                    if(data.result == "true") {
                        this.myCart();
                    } else {

                    }
                }
            );
        }
        this.updateCart();
    }

    addressDetails(){
        this.userAddress = true;
        var params = {user_id: this.userId};
        this.dataService.addressDetails(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.details = data.data;
                    if(!this.orderNumberOfAddress){
                        for(var loop = 0; loop < this.details.length; loop++) {
                            if(this.details[loop]['default'] == true){
                                this.activeAddress = loop;
                            }
                        }
                    }
                    
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

    chooseAddress(link){
        this.activeAddress = link;
        this.deliveryAddress = this.details[this.activeAddress];
    }

    chooseTimeSlot(time) {
        this.manualTime = false;
        this.activeTime = time;
        if(this.totalCart <100 ){
            this.deliveryCharge = parseFloat('10.00').toFixed(2);
        } else {
            this.deliveryCharge = parseFloat('0.00').toFixed(2);;
        }
        if(this.activeTime == '1'){
            this.totalCartAmount = parseFloat(this.totalCartAmount) + parseFloat('0.00');
             //orderinvoice
            if(this.orderinvoiceData){
                if(this.orderinvoiceData.service.specific_time_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('19.90');
                }
                if(this.orderinvoiceData.service.same_day_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('5.00');
                }
                if(this.orderinvoiceData.service.two_hours_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('19.90');
                }
            }
            this.deliveryCharge = parseFloat(this.deliveryCharge);
            this.specificTimeCharge = parseFloat('0.00');
            this.specificTimeText = 'Next Day Delivery';
        } else if(this.activeTime == '2'){
            this.totalCartAmount = parseFloat(this.totalCartAmount) + parseFloat('5.00');
            //orderinvoice
            if(this.orderinvoiceData){
                if(this.orderinvoiceData.service.specific_time_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('19.90');
                }
                if(this.orderinvoiceData.service.same_day_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('5.00');
                }
                if(this.orderinvoiceData.service.two_hours_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('19.90');
                }
            }
            this.deliveryCharge = parseFloat(this.deliveryCharge);
            this.specificTimeCharge = parseFloat('5.00');
            this.specificTimeText = 'Same Day Delivery Charge';
        } else if(this.activeTime == '3') {
            this.totalCartAmount = parseFloat(this.totalCartAmount) + parseFloat('19.90');
            //orderinvoice
            if(this.orderinvoiceData){
                if(this.orderinvoiceData.service.specific_time_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('19.90');
                }
                if(this.orderinvoiceData.service.same_day_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('5.00');
                }
                if(this.orderinvoiceData.service.two_hours_delivery['status'] == true){
                    this.totalCartAmount = this.totalCartAmount - parseFloat('19.90');
                }
            }
            this.deliveryCharge = parseFloat(this.deliveryCharge);
            this.specificTimeCharge = parseFloat('19.90');
            this.specificTimeText = '2-Hour Delivery Charge';
        }   
    }

    chooseSlot(slot, day) {
        this.activeDay = day;
        this.activeSlot = slot;
        this.selectedTimeSlot = this.currentWeek[day];
        this.scheduledDelivery = 'NEXT DAY delivery';
        this.between = 'between';
        this.onlyManual = false;
        this.checkout.date = this.selectedTimeSlot;
    }

    chooseSameDaySlot(slot) {
        if(this.activeSameDaySlot != slot) {
            this.activeSameDaySlot = slot;
            this.selectedTimeSlot = this.checkout.singledate;
            this.activeSlot = this.activeSameDaySlot;
        } else {
            this.activeSameDaySlot = '';
        }
        this.scheduledDelivery = 'SAME DAY delivery'; 
        this.between = 'between';   
    }

    nextDayNoDisable() {
        if(this.checkout.singlehour.getDay() != this.currentDate.getDay()){
            this.removeDisable = true;
        } else {
            this.removeDisable = false;
        }
        if(this.checkout.singlehour.getDay() == '0' || this.checkout.singlehour.getDay() == '6'){
           this.weekend = true;
        } else {
           this.weekend = false;
        }
    }

    chooseHourSlot(slot) {
        if(this.activeHourSlot != slot) {
            this.activeHourSlot = slot;
            this.selectedTimeSlot = this.checkout.singlehour;
            this.activeSlot = this.activeHourSlot;
        } else {
            this.activeHourSlot = '';
        }
        this.scheduledDelivery = '2 HOUR delivery';
        this.between = 'between';    
    }

    choosePayment(payment){
        this.activePayment = payment;
        if(this.activePayment == '2'){
            this.paymentType = 'Credit Card';
            this.checkoutPaymentType = 'CARD';
            this.creditCardOption = true;
            this.cardCharges = parseFloat(this.totalCart) * 4 / 100;
            this.totalCartAmount = parseFloat(this.totalCartAmount) + parseFloat(this.cardCharges);
        } else {
            this.paymentType = 'Cash on delivery';
            this.checkoutPaymentType = 'COD';
            this.cardCharges = 0;
            this.creditCardOption = false;
            this.totalCartAmount = this.totalCartAmount;
            this.creditCard = false;
        }
    }

    serviceAdd(){
        Swal.fire('Success...', 'Smoke is added to your cart', 'success');
        this.checkout.smokeDetail = '';
    }

    cartClean(){
        if(this.router.url == "/checkout/"+this.cartId) {
            this.cartID = this.cartId;
        } else {
            this.cartID = '';
        }
        var params = {cart_token: this.token, userId: this.userId, cartId: this.cartID};
        this.dataService.cartClean(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    
                } else {
                    
                }
            }
        );
    }

    greatDealPromotions(){
        var params = {user_id: this.token};
        this.dataService.greatDealPromotions(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.greatDeal = data.data;
                    this.greatAlready = data.already_added;
                    if(this.greatAlready == 'already_added'){
                        this.alreadyAddedGreat = true;
                    }
                } else {
                    
                }
            }
        );
    }

    amazingPromotions(){
        //this.alreadyAddedAmazing = false;
        var params = {user_id: this.token};
        this.dataService.amazingPromotions(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.amazing = data.data;
                    this.amazingAlready = data.already_added;
                    if(this.amazingAlready == 'already_added'){
                        this.alreadyAddedAmazing = true;
                    }
                } else {
                    
                }
            }
        );
    }

    timeSlot(){

        if(this.activeTime == '1'){
           this.selectedTimeSlot = this.checkout.date;
        } else if(this.activeTime == '2'){
           this.selectedTimeSlot = this.checkout.singledate;
        } else if(this.activeTime == '3'){
           this.selectedTimeSlot = this.checkout.singlehour;
        }
        if(this.activeTime == undefined || (this.activeTime == '1' && this.notManual)){
           if(this.activeSlot == undefined || this.activeSlot == '') {
               Swal.fire('Oops!!!...', 'Please choose time slot', 'error');
               return false;
           } else if(this.manualStartTime == undefined && this.manualEndTime == undefined && this.onlyManual){
               Swal.fire('Oops!!!...', 'Please choose time slot', 'error');
               return false;
           } else {
               this.backStep2 = true;
               this.backStep3 = true;
               this.backStep4 = true;
               this.currentStep = 4;
               return true;
           }
        } else {
            
            if(this.activeTime == '2'){
                if(this.activeSameDaySlot == undefined){
                   Swal.fire('Oops!!!...', 'Please choose time slot', 'error');
                   return false;
                } else {
                   this.backStep2 = true;
                   this.backStep3 = true;
                   this.backStep4 = true;
                   this.currentStep = 4;
                   return true;
                }
                
                
            } else if(this.activeTime == '3') {
                if(this.activeHourSlot == undefined){
                    Swal.fire('Oops!!!...', 'Please choose time slot', 'error');
                    return false;
                } else {
                   this.backStep2 = true;
                   this.backStep3 = true;
                   this.backStep4 = true;
                   this.currentStep = 4;
                   return true;
                }
                    
            } else {
                if((this.activeSlot == undefined) && (this.manualStartTime == undefined && this.manualEndTime == undefined)){
                    Swal.fire('Oops!!!...', 'Please choose time slot', 'error');
                    return false;
                } else {
                   this.backStep2 = true;
                   this.backStep3 = true;
                   this.backStep4 = true;
                   this.currentStep = 4;
                   return true;
                }
            }
        }
        
    }

    giftCertificatEmail(){
        for(var loop = 0; loop < this.cartList.length; loop++) {
            if(this.cartList[loop]['gift_certificate'] == 'true'){
               this.giftCertificate = this.cartList[loop].id;
            }
        }
        var params = {user_id: this.userId, product_id: this.giftCertificate, user_token: this.token};
        this.dataService.giftCertificatEmail(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    
                } else {
                    
                }
            }
        );
    }

    sendSMS(){
        for(var loop = 0; loop < this.cartList.length; loop++) {
            if(this.cartList[loop]['gift_certificate'] == 'true'){
               this.giftCertificate = this.cartList[loop].id;
            }
        }
        var params = {user_id: this.userId, product_id: this.giftCertificate, user_token: this.token};
        this.dataService.sendSMS(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    
                } else {
                    
                }
            }
        );
    }

    orderConfirmMail(){
        var params = {user_id: this.userId, order_id: this.orderId};
         this.dataService.orderConfirmMail(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {

                } else {
                    
                }
            }
        );
    }

    checkCardType(){
        this.invalidCard = false;
        if(/^(5018|5020|5038|6304|6759|676[1-3])/.test(this.checkout.cardno)) {
           this.cardType =  'maestro';
        } else if(/^(36|38|30[0-5])/.test(this.checkout.cardno)) {
            this.cardType =  'dinersclub';
        } else if(/^(6706|6771|6709)/.test(this.checkout.cardno)){
            this.cardType =  'laser';
        } else if(/^35/.test(this.checkout.cardno)){
            this.cardType =  'jcb';
        } else if(/^62/.test(this.checkout.cardno)){
            this.cardType =  'unionpay';
        } else if(/^(6011|65|64[4-9]|622)/.test(this.checkout.cardno)){
            this.cardType =  'discover';
        } else if(/^5[1-5]/.test(this.checkout.cardno)){
            this.cardType =  'mastercard';
        } else if(/^3[47]/.test(this.checkout.cardno)){
            this.cardType =  'amex';
        } else if(/^4/.test(this.checkout.cardno)){
            this.cardType =  'visa';
        } else {
            this.invalidCard = true;
        }
    }

    saveCard(){
       this.expDate = this.checkout.expMonth + this.checkout.expYear;
       var params = {user_id: this.userId, card_no: this.checkout.cardno, cvv: this.checkout.cvv, type: this.cardType, exp_date: this.expDate, payer_name: this.checkout.cardHolder};
         this.dataService.saveCard(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    
                } else {
                    
                }
            }
        );
    }

    checkSaveFuture(){
        if(this.checkout.saveFuture == true){
            this.saveCard();
        } else {
            var params = {user_id: this.userId, card_no: this.checkout.cardno};
            this.dataService.deleteSaveCard(params)
              .subscribe(
                (data) => {
                    if(data.result == "true") {
                        this.saveCardList();
                    } else {
                        
                    }
                }
            );
        }
    }

    deleteSaveCard(cardNo){
        Swal.fire({
            title: "Are you sure?", 
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }) .then((result) => {
            if (result.value) {
                var params = {user_id: this.userId, card_no: cardNo};
                this.dataService.deleteSaveCard(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            this.saveCardList();
                        } else {
                            
                        }
                    }
                );
            }
        });
    }

    saveCardList(){
       var params = {user_id: this.userId};
         this.dataService.saveCardList(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.creditcardList = data.data;
                    for(var loop = 0; loop < data.data.length; loop++) {
                        this.cardNumber[loop] = data.data[loop].card_no.slice(-4);
                        //this.cardCvv[loop] = data.data[loop].cvv;
                    }
                } else {
                    
                }
            }
        );
    }

    newCreditCard(){
        if(this.checkout.creditCardRadio == 'on'){
           this.creditCard = true;
           this.cvvSection = false;
        } else {
           this.creditCard = false;
        }
    }

    nextFiveStep(){
        this.cardNumberRequired = false;
        this.digitError = false;
        this.digitAmexError = false;
        this.cvvRequired = false;
        this.cardHolderRequired = false;
        this.ExpMonthRequired = false;
        this.ExpYearRequired = false;
        var cnumber = new String(this.checkout.cardno);
        this.cardLength = cnumber.length;
        if(this.activePayment == '1'){
            this.currentStep = 5;
            this.choosePayment(1);
        } else {
            if(this.creditCard == true){
                if(this.checkout.cardno == undefined){
                    this.cardNumberRequired = true;
                    return false;
                } else if(this.cardType != 'amex' && this.cardLength != 16){
                    this.digitError = true;
                    return false;
                   
                } else if(this.cardType == 'amex' && this.cardLength != 15){
                    this.digitAmexError = true;
                    return false;
                   
                } else if(this.checkout.cvv == undefined){
                    this.cvvRequired = true;
                    return false;
                } else if(this.checkout.cardHolder == undefined){
                    this.cardHolderRequired = true;
                    return false;
                } else if(this.checkout.expMonth == undefined){
                    this.ExpMonthRequired = true;
                    return false;
                } else if(this.checkout.expYear == undefined){
                    this.ExpYearRequired = true;
                    return false;
                } else if(this.invalidCard == true){
                    return false;
                } else {
                    this.currentStep = 5;
                }
            } else if(this.creditCard == false) {
                for(var loop = 0; loop < this.creditcardList.length; loop++){
                    if(this.creditcardList[loop].creditSavedRadio == 'on'){
                        if(this.creditcardList[loop].cvvnew != undefined && this.creditcardList[loop].cvvnew == this.creditcardList[loop].cvv){
                            this.currentStep = 5;
                        } else {
                           this.cvvRequired = true;
                           this.backStep5 = false;
                           return false;
                        }
                    }
                }
            }
        }
        if(this.scheduledDelivery == 'NEXT DAY delivery'){
            this.tooltipMode = 'NEXT DAY delivery';
        } else if(this.scheduledDelivery == 'NEXT DAY delivery with specific time selection'){
            this.tooltipMode = 'Orders placed before 2359HOURS will be delivered the next day within a 1 hour time range you have selected for an additional $19.90';
        } else if(this.scheduledDelivery == 'SAME DAY delivery'){
            this.tooltipMode = 'Orders will be sent within the day if orders are placed before 2pm for an additional $5.';
        } else if(this.scheduledDelivery == '2 HOUR delivery'){
            this.tooltipMode = 'Orders will be sent within 2 hours for an additional $19.90.';
        } else if(this.scheduledDelivery == 'Store pickup'){
            this.tooltipMode = 'Drop by to our location to pick you order up !';
        }
        
    }

    saveCreditCard(card){
        this.cvvSection = card.card_no;
        this.creditCard = false;
        card.creditSavedRadio = 'on';
        card.activeRadio = 'true';
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

    updateSoldProduct(){
        if(this.router.url == "/checkout/"+this.cartId) {
            this.cartID = this.cartId;
        } else {
            this.cartID = '';
        }
        var params = {cart_token: this.token, userId: this.userId, cartId: this.cartID};
        this.dataService.updateSoldProduct(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    
                } else {

                }
            }
        );
    }

    checkOut(){
        var DCDate = this.currentDate;
        var orderCurrentDate = DCDate.toDateString();

        if(this.shippingStatus == true ){
            this.customShippingPrice = this.customShippingPrice;
        } else {
            this.customShippingPrice = '';
        }
        this.paymentDone = true;
        if(this.activeDelivery == '1'){
            if(this.activeTime == '1'){
               this.scheduledTime = 'Next day delivery';
               this.dateOfDelivery = this.selectedTimeSlot;
               //this.selectedTimeSlot = this.checkout.date;
               if(this.manualStartTime != undefined && this.manualEndTime != undefined){
                   this.activeSlot = this.manualStartTime + '-' + this.manualEndTime;
               }
               this.timeOfDelivery = this.activeSlot;
            } else if(this.activeTime == '2'){
               this.scheduledTime = 'Same day delivery';
               this.dateOfDelivery = this.selectedTimeSlot;
               //this.selectedTimeSlot = this.checkout.singledate;
               this.timeOfDelivery = this.activeSlot;
            } else {
               this.scheduledTime = '2 hour delivery';
               this.dateOfDelivery = this.selectedTimeSlot;
               //this.selectedTimeSlot = this.checkout.singlehour;
               this.timeOfDelivery = this.activeSlot;
            }
            var DDate = this.dateOfDelivery;
            var orderDate = DDate.toDateString();
        } else {
            this.deliveryCharge = parseFloat('0.00');
            var DDate = this.currentDate;
            var orderDate = DDate.toDateString();
        }
        
        //For credit card

        if(this.checkout.creditCardRadio == 'on'){
            this.checkoutCardNo = this.checkout.cardno;
            this.checkoutExpDate = this.checkout.expMonth + this.checkout.expYear;
            this.checkoutCVV = this.checkout.cvv;
            this.checkoutHolderName = this.checkout.cardHolder;
            this.typeOfCard = this.cardType;
        } else {
            for(var loop = 0; loop < this.creditcardList.length; loop++) {
                if(this.creditcardList[loop].creditSavedRadio == 'on'){
                    this.checkoutCardNo = this.creditcardList[loop].card_no;
                    this.checkoutExpDate = this.creditcardList[loop].exp_date;
                    this.checkoutHolderName = this.creditcardList[loop].payer_name;
                    this.typeOfCard = this.creditcardList[loop].type;
                    this.checkoutCVV = this.creditcardList[loop].cvvnew;
                }
            }
            
        }

        //For delivery address
        if(this.activeDelivery == '1'){
            this.checkoutBuilding = this.deliveryAddress['building_name'];
            this.checkoutStreet = this.deliveryAddress['street'];
            this.checkoutPostal = this.deliveryAddress['postal_code'];
            this.checkoutHouse = this.deliveryAddress['house_no'];
            this.checkoutFloor = this.deliveryAddress['floor'];
            this.checkoutUnit = this.deliveryAddress['unit'];
            this.checkoutFirstname = this.deliveryAddress['firstname'];
            this.checkoutLastname = this.deliveryAddress['lastname'];
            this.checkoutAddress =  this.deliveryAddress['address'];
            this.checkoutDelivery = this.deliveryAddress['default'];
            this.checkoutCompany = this.deliveryAddress['company'];
            this.addressDelivery = this.deliveryAddress['searchval'];
        } else {
            this.checkoutBuilding = '1 Sims Lane';
            this.checkoutStreet = '';
            this.checkoutPostal = '387355';
            this.checkoutHouse = '';
            this.checkoutFloor = '01';
            this.checkoutUnit = '06';
            this.checkoutFirstname = '';
            this.checkoutLastname = '';
            this.checkoutAddress =  '';
            this.checkoutDelivery = '';
            this.checkoutCompany = '';
            this.dateOfDelivery = this.currentDate;
            this.addressDelivery = "false";
        }

        this.deliveryType = this.scheduledTime;
        this.totalCharges = parseFloat(this.deliveryCharge) + parseFloat(this.specificTimeCharge);
        this.checkoutCoupon = this.checkoutInvoiceCoupon;
        
        var params = {user_id: this.userId, cart_token: this.token, searchval: this.addressDelivery, firstname: this.checkoutFirstname, lastname: this.checkoutLastname, building_name: this.checkoutBuilding, street: this.checkoutStreet, postal_code: this.checkoutPostal, house_no: this.checkoutHouse, floor: this.checkoutFloor, unit: this.checkoutUnit, address: this.checkoutAddress, company_name: this.checkoutCompany, default: this.checkoutDelivery, delivery_type: this.deliveryType, delivery_charges: this.deliveryCharge, specificTimeCharge: this.specificTimeCharge, leaveatdoor: this.checkout.leaveatdoor, instructions: this.checkout.instructions, contact_default: this.checkout.default, deliveryDate: orderDate, deliveryTimeRange: this.timeOfDelivery, method: this.checkoutPaymentType, subtotal: this.totalCart, discount: this.discountAmount, total: this.totalCartAmount, coupon: this.checkoutCoupon, card_no: this.checkoutCardNo, exp_date: this.checkoutExpDate, cvv2: this.checkoutCVV, payer_name: this.checkoutHolderName, payer_email: this.profile.email, card_type: this.typeOfCard, cardCharges: this.cardCharges, shippingCharge: this.customShippingPrice, slotkey: this.slotKey};
        this.dataService.checkOut(params)
          .subscribe(
            (data) => {
                this.paymentDone = false;
                if(data.result == "true") {
                    this.orderId = data.order_id;
                    this.paymentProcessType = data.type;
                    this.paymentRedirectUrl = data.data;
                    if(this.paymentProcessType == 'cash'){
                        this.router.navigate(['/orderplaced/' + this.orderId]);
                        this.orderConfirmMail();
                    } else {
                        window.location.href = this.paymentRedirectUrl;
                    }
                    
                    for(var loop = 0; loop < this.cartList.length; loop++) {
                        if(this.cartList[loop]['gift_certificate'] == 'true'){
                           this.giftCertificatEmail();
                           this.sendSMS();
                        }
                    }
                    this.updateSoldProduct();
                    this.cartClean();
                    if(orderDate == orderCurrentDate){
                        var params = {order_id: this.orderId};
                        this.dataService.updateInventory(params)
                          .subscribe(
                            (data) => {
                                if(data.result == "true") {
                                    
                                } else {

                                }
                            }
                        );
                    }
                } else {
                    
                }
            }
        );
    }

}

@Component({
  selector: 'app-checkoutdialog',
  templateUrl: './checkoutdialog.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutDialog implements OnInit {

    RelatedproductConfig: any;
    products: any[] = [];
    loader: boolean = false;
    checkoutDialog: boolean = true;
    userId: any;
    success: any;
    error: any;
    dontMiss: any[] =[];
    deviceInfo;
    token: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, public dialogRef: MatDialogRef<CheckoutDialog>) { 
      this.userId = this.utilsService.validateUser();
      var deviceInfo = this.utilsService.getDevice();
      this.token = this.utilsService.getData('alutoken');
      this.deviceInfo = deviceInfo.device;
      if(this.deviceInfo != 'phone'){
          this.RelatedproductConfig = {"slidesToShow": 4, "slidesToScroll": 1,"arrows": true, "autoplay": true, "autoplaySpeed": 2000,};
      } else {
          this.RelatedproductConfig = {"slidesToShow": 2, "slidesToScroll": 1,"arrows": true, "autoplay": true, "autoplaySpeed": 2000,};
      }
    }

    @HostListener('window:keyup.esc') onKeyUp() {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.dontMissPromotions();
    }

    dontMissPromotions(){
        this.loader = true;
        this.checkoutDialog = false;
        var params = {};
        this.dataService.dontMissPromotions(params)
          .subscribe(
            (data) => {
                this.loader = false;
                this.checkoutDialog = true;
                if(data.result == "true") {
                    this.dontMiss = data.data;
                } else {
                    
                }
            }
        );
    }

    addToCart(productID, type){
        var params = {product_id: productID, quantity: '1', user_id: this.token, type: type};
        this.dataService.addToCart(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.success = data.message;
                    Swal.fire('Success...', this.success, 'success');
                } else {
                    this.error = data.message;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }

    addWishlist(productID){
        var params = {user_id: this.userId, product_id: productID};
        this.dataService.addWishlist(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.success = data.message;
                    Swal.fire('Success...', this.success, 'success');
                } else {
                    this.error = data.message;
                    Swal.fire('Oops!!!...', this.error, 'error');
                }
            }
        );
    }

    continueCheckout(){
        this.dialogRef.close('continue');
    }

}


@Component({
  selector: 'app-addaddressdialog',
  templateUrl: './addressdialog.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class AddAddressDialog implements OnInit {

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

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, public dialogRef: MatDialogRef<AddAddressDialog>) {
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
                } 
            }
        );
    }

    displayFn(selectedLocation) {
        this.latitude = selectedLocation.option.value.LATITUDE;
        this.longitude = selectedLocation.option.value.LONGITUDE;
        this.showAfterSelection = true;
        this.selectFirst = false;
        this.address.postal_code =  selectedLocation.option.value.POSTAL;
        this.address.postalcode = selectedLocation.option.value.ADDRESS;
        this.address.building_name = selectedLocation.option.value.BUILDING;
        this.roadName = selectedLocation.option.value.ROAD_NAME;
        this.houseName = selectedLocation.option.value.BLK_NO;
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
                    this.dialogRef.close(AddAddressDialog);
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
  selector: 'app-editaddressdialog',
  templateUrl: './editaddressdialog.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class EditAddressDialog implements OnInit {
    addressEdit: any = {};
    userId: any;
    editIndex: any;
    userAddress: boolean = true;
    details: any;

    constructor(private router: Router, public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditAddressDialog>) {
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
        var params = {user_id: this.userId, firstname: this.addressEdit.first_name, lastname: this.addressEdit.last_name, company_name: this.addressEdit.company_name , building_name: this.addressEdit.building_name, street: this.addressEdit.street, postal_code: this.addressEdit.postal_code, house_no: this.addressEdit.house_no, floor: this.addressEdit.floor, unit: this.addressEdit.unit, address: this.addressEdit.instructions, default: this.addressEdit.check, index: this.editIndex};
        this.dataService.editAddress(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    Swal.fire('Success...', "Address edited successfully", 'success');
                    this.dialogRef.close(EditAddressDialog);
                    //window.location.reload();
                } else {
                    
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
                var params = {user_id: this.userId, index: this.editIndex};
                this.dataService.deleteAddress(params)
                  .subscribe(
                    (data) => {
                        if(data.result == "true") {
                            this.dialogRef.close();
                            this.addressDetails();
                        } else {

                        }
                    }
                );
            }
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
}


@Component({
  selector: 'app-deliverydialog',
  templateUrl: './delivery.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class SetDeliveryTimeDialog implements OnInit {

    delivery: any = {};
    timeSection: boolean = false;
    activeLink: any;
    constructor(public dialogRef: MatDialogRef<SetDeliveryTimeDialog>, private atp: AmazingTimePickerService) {}

    @HostListener('window:keyup.esc') onKeyUp() {
        this.dialogRef.close();
    }

    ngOnInit() {
       this.delivery.time = '1';
       this.delivery.time2 = '2'; 
       this.delivery.minuteB = '00';
       this.delivery.minuteA = '30';
       this.delivery.timeDisable = true;
    }

    open() {
        const amazingTimePicker = this.atp.open();
        amazingTimePicker.afterClose().subscribe(time => {
            this.delivery.startTime = time;
            var hms = this.delivery.startTime;  
            var a = hms.split(':');
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) + 3600;
            var minM = parseInt(a[1]);
            var hourM = parseInt(a[0]);
            
            if(hourM == 0){
               var hourM = 12;
            }
            if (minM <= 9){
                var minN = '0' + minM;
            } 
            if(minM <=29 ){
                var minN = '00';
            } else {
                var minN = '30';
            }
            var manualTime = hourM + ":" + minN;
            this.delivery.startTime = manualTime;

            var d = Number(seconds);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 % 60);

            var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " " : "") : "00";
            if(mDisplay <= '29' ){
                var mnDisplay = '00';
            } else {
                var mnDisplay = '30';
            }
            this.delivery.endTime = hDisplay + mnDisplay;
        });
      }

    timeSet(){
        if(this.delivery.startTime != undefined && this.delivery.endTime != undefined){
           this.dialogRef.close(this.delivery);
           this.delivery.close = true;
           return true;
        } else {
           return false;
        }
        
    }

    selectTime(time){
        this.delivery.startTime = time;
        this.activeLink = time;
        this.delivery.timeDisable = false;
    }
    selectTimeSection(){
        this.timeSection = true;
        this.delivery.timeDisable = true;
    }

    minuteBeforeH(){
        this.delivery.startTime = this.delivery.startTime + ':' + this.delivery.minuteB;
        this.timeSection = false;

        var hms = this.delivery.startTime;  
        var a = hms.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) + 3600;
        var minM = parseInt(a[1]);
        var hourM = parseInt(a[0]);
        var d = Number(seconds);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " " : "") : "00";

        this.delivery.endTime = hDisplay + mDisplay;
    }

    minuteafterH(){
        this.delivery.startTime = this.delivery.startTime + ':' + this.delivery.minuteA;
        this.timeSection = false;
        var hms = this.delivery.startTime;  
        var a = hms.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) + 3600;
        var minM = parseInt(a[1]);
        var hourM = parseInt(a[0]);
        var d = Number(seconds);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " " : "") : "00";

        this.delivery.endTime = hDisplay + mDisplay;
    }
}


@Component({
  selector: 'app-giftdialog',
  templateUrl: './giftdialog.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class GiftDialog implements OnInit {

    gift: any[] = [];

    constructor(public dataService:DataService, public utilsService:UtilsService, private activatedRoute: ActivatedRoute, public dialogRef: MatDialogRef<GiftDialog>) {}

    @HostListener('window:keyup.esc') onKeyUp() {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.giftListing();
    }

    giftListing(){
        var params = {};
        this.dataService.giftListing(params)
          .subscribe(
            (data) => {
                if(data.result == "true") {
                    this.gift = data.data;
                } else {
                    
                }
            }
        );
    }

    closeModal(){
        this.dialogRef.close(GiftDialog);
    }
}
