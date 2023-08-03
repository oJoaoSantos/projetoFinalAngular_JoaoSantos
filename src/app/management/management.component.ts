import { Component, TemplateRef } from '@angular/core';
import { ServproductService } from '../shared/products/servproduct.service';
import { Product } from '../shared/products/product.model';
import { ServlocalstorageService } from '../shared/sessionstorage/servlocalstorage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  products: Product[] = [];
  productsFiltered: Product[] = [];
  productsToshow: Product[] = [];
  logged!:boolean;
  originalImg!: string;
  types: string[] = ["Calças", "Camisa", "Casaco", "T-shirt", "Sweatshirt"]
  insertForm!: FormGroup;
  newProduct: Product = {
    nome:"", 
    marca:"", 
    tipo_de_produto:"",
    cor:"",
    preco: 0,
    descricao:"",
    destaque:false
  };

    searchForm!: FormGroup;
    searchText!: string;
    filteredActive: boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private servproduct: ServproductService,
    private servstorage: ServlocalstorageService,
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }
  
  ngOnInit(){
    this.showProducts();
    this.logged=this.servstorage.get("logged")==="y";
    this.insertForm = this.formBuilder.group({
      nome:["", Validators.required], 
      marca:["", Validators.required], 
      tipo_de_produto:["", Validators.required],
      cor:["", Validators.required],
      preco: [0, Validators.required],
      descricao:["", Validators.required],
      destaque:[false, Validators.required]
    });
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
  getAllProducts(){
    this.servproduct.getAllProducts().subscribe({
      next: product => {
        this.products=product;
        this.productsToshow=this.products;
        console.log(this.products)
      },
      error: e => window.location.replace("http://localhost:4200/**")
    });
  }
    showProducts(){
    if (this.filteredActive) {
      this.searchProducts();
    }else{
      this.getAllProducts();
    }
  }
  deleteProduct(id: number){
    console.log(id);
    this.servproduct.deleteProduct(id).subscribe();
    this.getAllProducts();
  }
  submitForm(){
    this.newProduct=this.insertForm.value;
    console.log(this.newProduct)
    this.servproduct.insertProduct(this.newProduct).subscribe();
    this.getAllProducts();
    this.insertForm.reset();   
  }
  // insertProduct(content: TemplateRef<any>){
  //   this.openModal(content)
  //   console.log(this.newProduct);
  //   this.servproduct.insertProduct(this.newProduct).subscribe();
  //   this.getAllProducts();
  //   this.insertForm.reset();
  // }

  searchProducts() {
    this.filteredActive=true;
    // console.log('Texto de pesquisa:', this.searchText);
    // console.log(this.products);
    this.productsToshow=this.products.filter(p=>p.nome.includes(this.searchText)||
    p.marca.includes(this.searchText)||
    p.tipo_de_produto.includes(this.searchText)||
    p.cor.includes(this.searchText));
    console.log(this.productsToshow);
  }

  clearSearch() {
    this.filteredActive=false;
    this.getAllProducts();
    this.searchForm.reset();
    this.searchText = '';
  }
}
