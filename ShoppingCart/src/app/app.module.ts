import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { LoginComponent } from './login/login.component';
import { NgxPopper } from 'angular-popper';
import {ProductListService} from './product-list.service';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import {FormsModule} from "@angular/forms";
import {RegistrationService} from "./registration.service";
import {AuthenticationService} from "./authentication.service";
import {AuthguardService} from "./authguard.service";
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProfileComponent } from './profile/profile.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    ProductDetailsComponent,
    ProductListComponent,
    UserCartComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    OrderHistoryComponent,
    ProfileComponent,
    AddProductsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPopper,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductListService,
              RegistrationService,
              AuthenticationService,
              AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
