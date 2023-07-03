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
import { FormsModule } from '@angular/forms'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    NgbCarouselModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
