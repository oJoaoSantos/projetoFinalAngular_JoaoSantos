import { Component, TemplateRef } from '@angular/core';
import { Product } from '../shared/products/product.model';
import { ServproductService } from '../shared/products/servproduct.service';
import { ServlocalstorageService } from '../shared/sessionstorage/servlocalstorage.service';
import { ServuserService } from '../shared/users/servuser.service';
import { User } from '../shared/users/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  allProducts: Product[] = [];
  product!: Product;
  productsToList: Product[]= [];
  listOfProducts!: number[];
  logged!:boolean;
  filteredList!: any;
  updatedUser!: User;
  cartMessage!: string;

  constructor(
    private modalService: NgbModal,
    private servproduct: ServproductService,
    private servstorage: ServlocalstorageService,
    private servuser: ServuserService) {}
    
  ngOnInit(){
      this.logged=this.servstorage.get("logged")==="y";
      this.getProductsToList();
  };
  openModal(content: TemplateRef<any>){
		this.modalService.open(content, { centered: true });
  };
  getProductsToList() {
    this.servproduct.getAllProducts().subscribe({
      next: products => {
        this.allProducts=products;
        // console.log(products);
        this.servuser.getUserById(this.servstorage.get("id")).subscribe({
          next: user => {
            for(let id of user.wishList!){
              // console.log(id);
              for(let product of products){
                if (product.id===id){
                  // console.log(this.productsToList);
                  this.productsToList.push(product);
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
    this.servuser.removeitemFromWishList(this.servstorage.get('id'), idProduct)
    this.getProductsToList();
    window.location.reload();
  }

  addToCart(idProduct: number){
    this.cartMessage=this.servuser.addItemToCart(this.servstorage.get('id'), idProduct)
    console.log(this.cartMessage);
  }

}

