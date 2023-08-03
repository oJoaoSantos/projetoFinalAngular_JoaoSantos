import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ServproductService {

  private urlAPI="http://localhost:3000/produtos";
  private productId!: number;

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
  
  getProductId(): number { 
    return this.productId; 
  }
  setProductId(id: number): void { 
    this.productId = id; 
  }

  getAllProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.urlAPI)
      .pipe(
        catchError(this.processError)
      );
  }
  getHighligthProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlAPI}?destaque=true`)
      .pipe(
        catchError(this.processError)
      );
  }
  getOneProduct(id: number) : Observable<Product> {
    return this.http.get<Product>(`${this.urlAPI}/${id}`)
      .pipe(
        catchError(this.processError)
      );
  }
  getFilteredProduct(atribute:string, filter: string) : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlAPI}?${atribute}}=${filter}`)
      .pipe(
        catchError(this.processError)
      );
  }
  insertProduct(product : Product) : Observable<Product> {
    return this.http.post<Product>(this.urlAPI,product).pipe(
      catchError(this.processError)
    );;
  }
  deleteProduct(id : number) : Observable<any> {
    return this.http.delete<any>(`${this.urlAPI}/${id}`).pipe(
      catchError(this.processError)
    );
  }
}
