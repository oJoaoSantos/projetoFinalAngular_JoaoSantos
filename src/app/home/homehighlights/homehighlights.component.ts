import { Component } from '@angular/core';
import { ServproductService } from 'src/app/shared/products/servproduct.service';
import { Product } from 'src/app/shared/products/product.model';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-homehighlights',
  templateUrl: './homehighlights.component.html',
  styleUrls: ['./homehighlights.component.css']
})
export class HomehighlightsComponent {
  highligthProducts: Product[] = [];
  id!: number;


  constructor(private servproduct: ServproductService) {}
  ngOnInit(){
    this.getHighligthProducts();
  };
  getId(id: number){
    this.id=id;
    this.servproduct.setProductId(this.id);
  }

  getHighligthProducts(){
    this.servproduct.getHighligthProducts().subscribe({
      next: product => {
        this.highligthProducts=product;
      },
      error: e => window.location.replace("http://localhost:4200/**")
    });
  }
}
