import { Component, } from '@angular/core';
import { ServproductService } from 'src/app/shared/products/servproduct.service';
import { Product } from 'src/app/shared/products/product.model';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent {
  product!: Product;
  id: number = 1;
  img1Src: string ="";
  img2Src: string ="";

  constructor(private servproduct: ServproductService) {
  }
  ngOnInit(){
    this.id=this.servproduct.getProductId()
    this.getOneProduct();
    console.log(this.id);
  };

  getOneProduct(){
    this.servproduct.getOneProduct(this.id).subscribe({
      next: product => {
        this.product=product;
        this.img1Src =`./assets/images/${this.product.foto_principal}`;
        this.img2Src =`./assets/images/${this.product.foto_secundaria}`;
        console.log(this.product);
      },
      error: erro => alert(erro.message)
    });
  }
}
