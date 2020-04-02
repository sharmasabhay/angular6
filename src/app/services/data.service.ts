import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private http: Http) { }
    
    base_url = 'http://localhost:4200';
    // api_url = 'http://ah.alcoholdelivery.com.sg';
    api_url = 'http://localhost/api/index.php';

    getConstants() {
        let constants: any[] = [];
        constants['api_url'] = this.api_url;
        return constants;
    }

    userLogin(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/login', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    userRegistration(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/registration', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    forgotPassword(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/forgotpassword', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    profileSettingDetails(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/profilesettings', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    editProfileSetting(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/profilesettings/editprofile', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    productListing(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/product', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    productDetails(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/product/productdetail', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    categoryList(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/category', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    myWishlist(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/wishlist', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    addWishlist(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/wishlist/add', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    addToCart(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/addtocart', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    myCart(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/cartlist', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    totalCart(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/totalcart', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    newArrivals(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/product/newarrival', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    updateCart(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/updatecart', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    deleteCart(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/deletecart', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    changePassword(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/profilesettings/changepassword', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    addAddress(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/profilesettings/addaddress', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    addressSearch(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/profilesettings/search', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    addressDetails(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/profilesettings/addressdetail', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    editAddress(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/profilesettings/editaddress', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    deleteAddress(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/profilesettings/deleteaddress', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    couponCode(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/couponcode', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    singleAddressDetails(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/profilesettings/editdetail', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    deleteWishlist(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/wishlist/delete', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    searching(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/product/search', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    limitSearching(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/product/searchproduct', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    checkOut(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/checkout', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    orderListing(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/order', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    orderHistory(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/order/orderdetail', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    recentOrder(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/order/recentorder', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    corporateAccount(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/contactus/corporateaccount', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    cartClean(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/checkout/cartblank', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    eventForm(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/contactus/events', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    contactUs(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/contactus', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    greatDealPromotions(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/promotionsproduct', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    amazingPromotions(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/promotionsproduct/morepromotion', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    dontMissPromotions(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/dontmiss', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    giftListing(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/gift', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    addToCartMultiple(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/addtocart', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    addToCartRecent(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/addtocartrecent', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    giftProduct(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/gift/giftproduct', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    giftAddtocart(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/giftaddtocart', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    orderRating(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/order/rateorder', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    wrapperList(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/giftcartlist', {params: params}, options).pipe(map((response: any) => response.json()));
    }
    
    facebook(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/facebooklogin/facebook', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    google(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/googlelogin/google', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    orderConfirmMail(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/checkout/orderconfirmmail', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    giftCertificatEmail(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/gift/giftcertificatemail', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    sendSMS(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/gift/sendsms', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    instagram(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/instagramlogin/insta', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    twitter(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/twitterlogin/twitterlog', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    userVerifyEmail(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/registration/uservarifyemail', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    varifyAccount(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/registration/varifyaccount', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    saveCard(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/checkout/savecard', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    saveCardList(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/checkout/savecardlist', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    deleteSaveCard(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/checkout/deletesavecard', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    singaporeTimezone(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/checkout/singaporeweekend', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    addToCartPromotion(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/addtocartpromo', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    createAccount(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/login/createaccount', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    orderInvoice(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/cart/cartorderinvoice', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    updateSoldProduct(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/checkout/updatesoldproduct', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    updateInventory(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/checkout/updateinventory', {params: params}, options).pipe(map((response: any) => response.json()));
    }

    announcementBar(params) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.api_url+'/setting', {params: params}, options).pipe(map((response: any) => response.json()));
    }

}
