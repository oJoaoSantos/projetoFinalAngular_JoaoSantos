import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home/home.component';
import { ProductviewComponent } from './shared/products/productview/productview.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ManagementComponent } from './management/management.component';
import { CartComponent } from './cart/cart.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productpage', component: ProductpageComponent }, 
  { path: 'productview', component: ProductviewComponent },
  { path: 'productpage/productview', component: ProductviewComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/productview', component: ProductviewComponent },
  { path: 'usermanagement', component: UsermanagementComponent },
  { path: '**', component: NotfoundComponent },
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
