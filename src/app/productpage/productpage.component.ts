import { Component, TemplateRef } from '@angular/core';
import { ServproductService } from 'src/app/shared/products/servproduct.service';
import { Product } from 'src/app/shared/products/product.model';
import { ServlocalstorageService } from '../shared/sessionstorage/servlocalstorage.service';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { NgClass } from '@angular/common';
import { ServuserService } from '../shared/users/servuser.service';
import { User } from '../shared/users/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent {
  starWishRegular=faStar;
  starWhishSolid=faThumbsUp;
  allProducts: Product[] = [];
  productsToshow: Product[] = [];
  productId!: number;
  userId!: number;
  user!: User[];
  originalImg!: string;
  logged!:boolean;
  // typeChoice: string = "todos";
  total: number = 0;
  increment: number = 6;
  timesIncremented: number = 0;
  allSeen: boolean = false;
  whished: boolean = true;
  cartMessage!: string;
  typeForm!: FormGroup;
  colorForm!: FormGroup;
  colorChoice!: string;
  typeChoice!: string;

  constructor(
    // private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private servproduct: ServproductService,
    private servstorage: ServlocalstorageService,
    private servuser: ServuserService) {
      this.colorForm = new FormGroup({
        color: new FormControl('Todos')
      });
      this.colorForm.get('color')?.valueChanges.subscribe(value => {
        this.colorChoice = value;
        this.colorFiltering();
      });
      this.typeForm = new FormGroup({
        type: new FormControl('Todos')
      });
      this.typeForm.get('type')?.valueChanges.subscribe(value => {
        this.typeChoice = value;
        this.typeFiltering();
      });    
    }
  
  ngOnInit(){
    // this.typeForm = this.formBuilder.group({
    //   type:[], 
    //  });
    //  this.colorForm = this.formBuilder.group({
    //   color:[], 
    //  });
    this.getAllProducts();
    this.getFirst6Products();
    this.logged=this.servstorage.get("logged")==="y";
  };
  openModal(content: TemplateRef<any>){
		this.modalService.open(content, { centered: true });
  };
  changeImage(product: Product){
    if (product.foto_principal) {
      this.originalImg = product.foto_principal;
      product.foto_principal = product.foto_secundaria;
    }
  }
  restoreImage(product: Product) {
    product.foto_principal = this.originalImg;
  }

  getIdProduct(id: number){
    this.productId=id;
    this.servproduct.setProductId(this.productId);
  }

  getAllProducts(){
    this.servproduct.getAllProducts().subscribe({
      next: product => {
        this.allProducts=product;
        this.total=this.allProducts.length;
      },
      error: e => window.location.replace("http://localhost:4200/**")
    });
  }

  getFirst6Products(){
    this.servproduct.getAllProducts().subscribe({
      next: product => {
        for (let p = 0; p < 6; p++) {
          this.productsToshow.push(product[p]);
        }
      },
      error: e => window.location.replace("http://localhost:4200/**")
    });
    // for (let p = 0; p < 6; p++) {
    //   this.productsToshow.push(this.allProducts[p]);
    // }
  }

  getMore6(){
    this.servproduct.getAllProducts().subscribe({
      next: product => {
        this.timesIncremented++;
        for (let p = 0+this.timesIncremented*this.increment; p < 6+this.timesIncremented*this.increment; p++) {
          this.productsToshow.push(product[p]);
          if (this.productsToshow.length>=this.total) {
            this.allSeen=true;
            stop;
          }
        }
      },
      error: e => window.location.replace("http://localhost:4200/**")
    });
  }

  colorFiltering(){
    // console.log(this.colorChoice);
    // this.servproduct.getFilteredProduct("cor", this.colorChoice).subscribe({
    //   next: product => {
    //     this.allProducts=product;
    //     console.log(this.allProducts)
    //     this.total=this.allProducts.length;
    //   },
    //   error: erro => alert(erro.message)
    // });
    // this.getFirst6Products();
  }
  typeFiltering(){
    // console.log(this.colorChoice);
    // this.servproduct.getFilteredProduct("tipo_de_produto", this.typeChoice).subscribe({
    //   next: product => {
    //     this.allProducts=product;
    //     console.log(this.allProducts)
    //     this.total=this.allProducts.length;
    //   },
    //   error: erro => alert(erro.message)
    // });
    // this.getFirst6Products();
  }

  addOrRemovoWishList(idProduct: number){

  }  
  
  wishedValidation(idProduct: number){
    this.servuser.getUserById(this.servstorage.get("id")).subscribe({
      next: user => {
        if (user.wishList?.some(p => p===idProduct)) {
          console.log(user.wishList?.some(p => p===idProduct))
          this.whished=true;
        } else {
          console.log(user.wishList?.some(p => p===idProduct))
          this.whished=false
        }
      },
      error: e => window.location.replace("http://localhost:4200/**")
    });
  }
  addToCart(idProduct: number){
    this.cartMessage=this.servuser.addItemToCart(this.servstorage.get('id'), idProduct)
    console.log(this.cartMessage);
  }
}
