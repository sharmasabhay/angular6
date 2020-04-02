import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from '../services/data.service';
import { DomSanitizer,Meta,Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    isBrowser: boolean = false;
    expiredDate: any = '';

    constructor(public dataService:DataService, private sanitizer: DomSanitizer, private meta: Meta, private title: Title, @Inject(PLATFORM_ID) private platformId, private cookieService: CookieService) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    loadConstants() {
        var constants = this.dataService.getConstants();
        Object.keys(constants).forEach(key => { 
            constants[key] = constants[key];
        });
        return constants;
    }

    getDefaultCookieExpireTime() {
        this.expiredDate = new Date();
        this.expiredDate.setDate(this.expiredDate.getDate() + 1);
        return this.expiredDate;
    }

    saveData(key, value) {
        localStorage.setItem(key, value);
    }

    removeData(key) {
        localStorage.removeItem(key);
    }

    getData(key) {
        return localStorage.getItem(key);
    }

    setCookie(name, value) {
        var time = this.getDefaultCookieExpireTime();
        this.cookieService.set(name, value, time, '/');
    }

    deleteCookie(name) {
        this.cookieService.delete(name, '/');
    }

    userLogout() {
        this.deleteCookie('aluid');
        this.deleteCookie('aluname');
        this.removeData("alutoken");
    }

    validateUser() {
        if(this.cookieService.get('aluid')) {
                return this.cookieService.get('aluid');
            } else {
                return false;
        }       
    }

    randomString(length) {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
           var result = '';
           for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
           return result;
    }

    getPagination(page, totalitems, limit) {
        var adjacents = 1;
        if(!page) page = 1;

        //other vars
        var prev = page - 1;                                  //previous page is page - 1
        var next = page + 1;                                  //next page is page + 1
        var totalpages = Math.ceil(totalitems / limit);      //totalpages is = total items / items per page, rounded up.
        var lpm1 = totalpages - 1;                            //last page minus 1
        var allPages = [];

        //pages 
        if (totalpages < (7 + (adjacents * 2))) {   
            for (var counter = 1; counter <= totalpages; counter++) {
                allPages.push(counter);
            }
        } else if(totalpages >= (7 + (adjacents * 2))) {
            //close to beginning; only hide later pages
            if(page < (1 + (adjacents * 3))) {
                for (var counter = 1; counter < 4 + (adjacents * 2); counter++) {
                    allPages.push(counter);
                }
                allPages.push('...');
                allPages.push(lpm1);
                allPages.push(totalpages);
            } else if((totalpages - (adjacents * 2)) > page && page > (adjacents * 2)) {
                allPages.push(1);
                allPages.push(2);
                allPages.push('...');
                for (var counter = page - adjacents; counter <= page + adjacents; counter++) {
                    allPages.push(counter);
                }
                allPages.push('...');
                allPages.push(lpm1);
                allPages.push(totalpages);
            } else {
                allPages.push(1);
                allPages.push(2);
                allPages.push('...');

                for (var counter = totalpages - (1 + (adjacents * 3)); counter <= totalpages; counter++) {
                    allPages.push(counter);
                }
            }
        }
        return allPages;
    }

    getTotalPages(totalRecords, recordsPerPage) {
        return Math.ceil(parseInt(totalRecords) / parseInt(recordsPerPage));
    }

    getDevice() {
        if(this.isBrowser) {
            var b = navigator.userAgent.toLowerCase();
            return { device: /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(b) ? "tablet" : /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(b) ? "phone" : "desktop"};
        } else {
            return { device: "desktop" };
        }
    }
    
}
