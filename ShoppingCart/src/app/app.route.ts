import { UserCartComponent } from './user-cart/user-cart.component';
import { HomePageComponent } from './home-page/home-page.component';
import {LoginComponent} from "./login/login.component";
import { Routes } from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {RegisterComponent} from "./register/register.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthguardService} from "./authguard.service";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {ProfileComponent} from "./profile/profile.component";
import {AddProductsComponent} from "./add-products/add-products.component";
export const MAIN_ROUTES:Routes = [
  {
    path: "",
    redirectTo: '/home',
    pathMatch:'full'
  },
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate:[AuthguardService]
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
      path: "cart",
      component: UserCartComponent,
    canActivate:[AuthguardService]
  },
  {
    path: "products",
    component: ProductListComponent,
  },
  {
    path: "products/:category",
    component: ProductListComponent,
  },
  {
    path: "productsFrom/:category",
    component: ProductListComponent,
  },
  {
    path: "product-detail/:id",
    component: ProductDetailsComponent,
  },
  {
    path: "orderHistory",
    component:OrderHistoryComponent,
    canActivate:[AuthguardService]
  },
  {
    path: "profile",
    component:ProfileComponent,
    canActivate:[AuthguardService]
  },
  {
    path: "addProducts",
    component:AddProductsComponent,
    canActivate:[AuthguardService]
  }

]
