import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainmenuComponent } from './header/mainmenu/mainmenu.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomesliderComponent } from './home/homeslider/homeslider.component';
import { HomehighlightsComponent } from './home/homehighlights/homehighlights.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home/home.component';
import { ProductviewComponent } from './shared/products/productview/productview.component';
import { IconmenuComponent } from './header/iconmenu/iconmenu.component';
import { HeaderComponent } from './header/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductpageComponent } from './productpage/productpage.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ManagementComponent } from './management/management.component';
import { CartComponent } from './cart/cart.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { NotfoundComponent } from './notfound/notfound.component'

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    FooterComponent,
    HomesliderComponent,
    HomehighlightsComponent,
    HomeComponent,
    ProductviewComponent,
    IconmenuComponent,
    HeaderComponent,
    ProductpageComponent,
    WishlistComponent,
    ManagementComponent,
    CartComponent,
    UsermanagementComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    NgbCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
