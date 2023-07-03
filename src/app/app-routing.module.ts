import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home/home.component';
import { ProductviewComponent } from './shared/products/productview/productview.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'productview', component: ProductviewComponent },
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
