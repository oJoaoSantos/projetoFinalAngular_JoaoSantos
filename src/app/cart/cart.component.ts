import { Component } from '@angular/core';
import { Product } from '../shared/products/product.model';
import { ServproductService } from '../shared/products/servproduct.service';
import { ServlocalstorageService } from '../shared/sessionstorage/servlocalstorage.service';
import { ServuserService } from '../shared/users/servuser.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  allProducts: Product[] = [];
  product!: Product;
  productsToList: Product[]= [];
  listOfProducts!: number[];
  logged!:boolean;
  totalPrice: number = 0;
  productId!:number;

  constructor(
    private servproduct: ServproductService,
    private servstorage: ServlocalstorageService,
    private servuser: ServuserService) {}
  
  ngOnInit(){
    this.logged=this.servstorage.get("logged")==="y";
    this.getProductsToList();
  };
  getIdProduct(id: number){
    this.productId=id;
    this.servproduct.setProductId(this.productId);
  }

    getProductsToList() {
      this.servproduct.getAllProducts().subscribe({
        next: products => {
          this.allProducts=products;
          // console.log(products);
          this.servuser.getUserById(this.servstorage.get("id")).subscribe({
            next: user => {
              for(let id of user.shopCar!){
                // console.log(id);
                for(let product of products){
                  if (product.id===id){
                    // console.log(this.productsToList);
                    this.productsToList.push(product);
                    this.totalPrice+=product.preco
                    // console.log(this.totalPrice)
                  }
                }
              }
            },
            error: e => window.location.replace("http://localhost:4200/**")
          }); 
        },
        error: e => window.location.replace("http://localhost:4200/**")
      });
    }
    removeProduct(idProduct: number){
      this.servuser.removeitemFromCart(this.servstorage.get('id'), idProduct)
      this.getProductsToList();
      window.location.reload();
    }
}
