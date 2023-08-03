import { Component, TemplateRef } from '@angular/core';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faCartShopping, faGear, faGears } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/users/user.model';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ServuserService } from 'src/app/shared/users/servuser.service';
import { ServlocalstorageService } from 'src/app/shared/sessionstorage/servlocalstorage.service';

@Component({
  selector: 'app-iconmenu',
  templateUrl: './iconmenu.component.html',
  styleUrls: ['./iconmenu.component.css']
})
export class IconmenuComponent {
  wishlist=faClipboard;
  profile=faUser;
  logout=faArrowRightFromBracket;
  regist=faUserPlus;
  login=faArrowRightToBracket;
  managment=faGear;
  cart=faCartShopping;
  logged!: boolean;
  newUserLogin: User = {
    "nome": "",
    "email": "",
    "senha": "",
    "admin": false,
    "ativo": true,
  };
  loginForm!: FormGroup; 
  // validation:string="";
  validateMessage:string="";
  errorMessage:string="";
  userName!:string;
  id!: number;
  permission!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private servuser: ServuserService,
    private servstorage: ServlocalstorageService) {}

  openModal(content: TemplateRef<any>){
		this.modalService.open(content, { centered: true });
  };
  // onLoginClick(){
  //   this.validation=this.servuser.validateCredentials(this.userModel.email, this.userModel.senha)
  //   if (this.validation==="valid") {
  //     this.modalService.dismissAll();
  //     this.userName=this.servuser.getName();
  //     this.id=this.servuser.getId();
  //     this.permission=this.servuser.getPermissionType();
  //     this.logged=true
  //     this.servstorage.set('logged','y');
  //     this.servstorage.set("name", `${this.userName}`);
  //     this.servstorage.set("id", `${this.id}`)
  //      if (this.permission) {
  //       this.servstorage.set('permission', 'y')
  //     } else {
  //       this.servstorage.set('permission', 'n')
  //     }
  //     window.location.reload();
  //   } else {
  //     this.errorMessage=this.validation;
  //   }
  // }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required, Validators.email], 
      senha:["", Validators.required] 
     });
    if (!this.servstorage.get("logged")) {
      this.servstorage.set("logged", "n")
    }
    if (this.servstorage.get("logged")==="y") {
      this.logged=true;
      this.userName=this.servstorage.get("name");
      if(this.servstorage.get("permission")==="y"){
        this.permission=true;
      }
    } else {
      this.logged=false;
    }
  }
  submitLogin(){
    this.newUserLogin=this.loginForm.value;
    console.log(this.newUserLogin.email);
    this.validateMessage=this.servuser.validateCredentials(this.newUserLogin.email, this.newUserLogin.senha)    
    if (this.validateMessage==="valid") {
          this.modalService.dismissAll();
          this.userName=this.servuser.getName();
          this.id=this.servuser.getId();
          this.permission=this.servuser.getPermissionType();
          this.logged=true
          this.servstorage.set('logged','y');
          this.servstorage.set("name", `${this.userName}`);
          this.servstorage.set("id", `${this.id}`)
           if (this.permission) {
            this.servstorage.set('permission', 'y')
          } else {
            this.servstorage.set('permission', 'n')
          }
          window.location.reload();
        } else {
          this.errorMessage=this.validateMessage;
        }    
  }
  
  onLogoutClick(){
    this.modalService.dismissAll();
    this.servstorage.clear();
    this.logged=false;
    window.location.replace("http://localhost:4200/")
  };
}


