import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ServuserService {

  private urlAPI="http://localhost:3000/utilizadores";
  user!:User[];
  userIndex!:number;
  validation:string="";
  userName:string="";
  id!: number;
  userPermission!: boolean;
  filteredList!: any;
  updatedCart!: any;
  newWishList! : any;
  newCart! : any;
  messageCart: string ="";

  constructor(private http: HttpClient) { }

  private processError(erro: HttpErrorResponse) {
    let mensagem="";
    if (erro.status!==404) {
      mensagem="Não foi possível estabelecer ligação com a API!";
    } else {
      mensagem="Ocorreu um erro.";
    }
    const error = new Error(mensagem);
    return throwError(() => error)
  }
  getAllUSers() : Observable<User[]> {
    return this.http.get<User[]>(this.urlAPI)
    .pipe(
      catchError(this.processError)
    );
  }
  getName(): string{
    return this.userName;
  }
  getId(): number{
    return this.id;
  }
 getPermissionType(): boolean{
    return this.userPermission;
  }
  getUserById(id: number) : Observable<User> {
    return this.http.get<User>(`${this.urlAPI}/${id}`)
    .pipe(
      catchError(this.processError)
    );
  }
  validateCredentials(mail: string, pass: string): string{
    this.getAllUSers().subscribe({
      next: user => {
        this.user=user;
        this.userIndex=this.user.findIndex(user => user.email===mail);
        if (this.userIndex!=-1 && this.user[this.userIndex].senha===pass && this.user[this.userIndex].ativo) {  
          this.validation="valid";
          this.userName=this.user[this.userIndex].nome;
          this.id=this.user[this.userIndex].id!;
          this.userPermission=this.user[this.userIndex].admin!;
        } else if(this.user[this.userIndex].ativo===false){
          this.validation="Aguarda Validação!";
        } else{
          this.validation="Utilizador Inexistente!";
        }
      },
    });
    return this.validation;
  }
  updateUser(id : number, someNew: string) : Observable<any> {
    // return this.http.put<User>(`${this.urlAPI}/${id}`, atualizado);
    return this.http.patch(`${this.urlAPI}/${id}`, someNew);
  }
  removeitemFromWishList(idUser: number, idProduct: number){
    this.getUserById(idUser).subscribe({
      next: user => {
        // console.log(idProduct);
        // console.log(user.wishList);
        this.filteredList= user.wishList?.filter(p => p!==idProduct)
        // console.log(this.filteredList);
        this.newWishList = {wishList: this.filteredList}
        this.updateUser(idUser, this.newWishList).subscribe();
      } 
    });
  }
  removeitemFromCart(idUser: number, idProduct: number){
    this.getUserById(idUser).subscribe({
      next: user => {
        // console.log(idProduct);
        // console.log(user.wishList);
        this.filteredList= user.shopCar?.filter(p => p!==idProduct)
        // console.log(this.filteredList);
        this.newCart = {shopCar: this.filteredList}
        this.updateUser(idUser, this.newCart).subscribe();
      } 
    });
  }
  addItemToCart(idUser: number, idProduct: number) : string{
    this.getUserById(idUser).subscribe({
      next: user => {
        // console.log(idProduct);
        // console.log(user.shopCar);
        if (user.shopCar?.includes(idProduct)) {
          this.messageCart="Produto já inserido!"
          console.log(this.messageCart);
        } else {
          this.messageCart="Produto Adicionado ao carrinho!";
          user.shopCar?.push(idProduct);
          this.updatedCart=user.shopCar;
          // console.log(this.updatedCart);
          this.newCart = {shopCar: this.updatedCart}
          this.updateUser(idUser, this.newCart).subscribe();
        }
      } 
    });
    return this.messageCart;
  }
}
