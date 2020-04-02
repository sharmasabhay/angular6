import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { NgModule } from '@angular/core';
import { appRouterModule } from "./app.routes";
import { SlickModule } from 'ngx-slick';
import { BarRatingModule } from "ngx-bar-rating";
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatTooltipModule, MatDatepickerModule, MatTabsModule, MatDialogModule, MatRadioModule, MatMenuModule, MatPaginatorModule, MatAutocompleteModule, MatExpansionModule, MatStepperModule, MatSlideToggleModule, MatNativeDateModule, MatListModule, MatProgressSpinnerModule, MatSidenavModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RecentOrderPopup } from './homepage/homepage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CollectionComponent } from './collection/collection.component';
import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { SigninComponent } from './signin/signin.component';
import { PasswordDialog } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { UseraddressComponent } from './useraddress/useraddress.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AddAdressDialog } from './useraddress/useraddress.component';
import { EditAdressDialog } from './useraddress/useraddress.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CorporateComponent } from './corporate/corporate.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutDialog } from './checkout/checkout.component';
import { GiftDialog } from './checkout/checkout.component';
import { AddAddressDialog } from './checkout/checkout.component';
import { EditAddressDialog } from './checkout/checkout.component';
import { SetDeliveryTimeDialog } from './checkout/checkout.component';
import { OrderplacedComponent } from './orderplaced/orderplaced.component';
import { EventsComponent } from './events/events.component';
import { MyaccountsidebarComponent } from './myaccountsidebar/myaccountsidebar.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import Swal from 'sweetalert2';
import { SearchComponent } from './search/search.component';
import { DatePipe } from '@angular/common';
import { AgedialogComponent } from './agedialog/agedialog.component';
import { AddgiftcardComponent } from './addgiftcard/addgiftcard.component';
import { GiftpackagingComponent } from './giftpackaging/giftpackaging.component';
import { GiftwrapperComponent } from './giftwrapper/giftwrapper.component';
import { VerifyaccountComponent } from './verifyaccount/verifyaccount.component';
import { CreditcardDirective } from './creditcard.directive';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RecentOrderPopup,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    CollectionComponent,
    SingleproductComponent,
    CartpageComponent,
    SigninComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    AboutusComponent,
    ContactusComponent,
    TermsComponent,
    PrivacyComponent,
    UseraddressComponent,
    MyaccountComponent,
    WishlistComponent,
    CorporateComponent,
    CheckoutComponent,
    CheckoutDialog,
    AddAddressDialog,
    EditAddressDialog,
    AddAdressDialog,
    EditAdressDialog,
    SetDeliveryTimeDialog,
    OrderplacedComponent,
    EventsComponent,
    MyaccountsidebarComponent,
    ChangepasswordComponent,
    OrderhistoryComponent,
    OrderdetailComponent,
    SearchComponent,
    AgedialogComponent,
    GiftDialog,
    PasswordDialog,
    AddgiftcardComponent,
    GiftpackagingComponent,
    GiftwrapperComponent,
    VerifyaccountComponent,
    CreditcardDirective
  ],
  imports: [
    BrowserModule,
    appRouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatRadioModule,
    MatMenuModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatIconModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    BarRatingModule,
    MatSidenavModule,
    MatListModule,
    HttpModule,
    MatProgressSpinnerModule,
    AmazingTimePickerModule,
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyD0hBZFGzUeEWR1RTGrP-9XCTmQLSbkbeA',
     libraries: ["places"]
   }),
    SlickModule.forRoot()
  ],
  providers: [CookieService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [CheckoutDialog, AddAddressDialog, EditAddressDialog, SetDeliveryTimeDialog ,AddAdressDialog, EditAdressDialog, RecentOrderPopup, GiftDialog, PasswordDialog]
})
export class AppModule { }
