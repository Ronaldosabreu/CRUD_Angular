import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

baseUrl = 'http://localhost:3001/products';

  private _productData= new BehaviorSubject<Product[]>([]);

  constructor(private satSnackBar: MatSnackBar,private http: HttpClient) { }

  showMessage(msg: string, isError: Boolean = false): void
  {
      this.satSnackBar.open(msg,'Fechar',
      {
        duration: 3000,
        horizontalPosition:"right",
        verticalPosition: "top",
        panelClass: isError ?  ['msg-error'] : ['msg-success']

      });
  }

  get productData(): Product[]{
    return this._productData.value
  }

  set productData(productData: Product[]){
    this._productData.next(productData)
  }

  create(product: Product): Observable<Product>
  {
    return this.http.post<Product>(this.baseUrl, product).pipe(
        map(obj => obj),
            catchError(e=>this.errorHandler(e))

      );
  }

  errorHandler(e: any): Observable<any>{
      this.showMessage('Ocorreu um erro!', true);
      return EMPTY;
  }

  read(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
          catchError(e=>this.errorHandler(e))

    );
  }

  readById(id: string): Observable<Product>
  {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      map(obj => obj),
          catchError(e=>this.errorHandler(e))

    );
  }

  delete(id: string): Observable<Product>
  {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`).pipe(
      map(obj => obj),
          catchError(e=>this.errorHandler(e))

    );
  }

  update(product: Product): Observable<Product>
  {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product).pipe(
      map(obj => obj),
          catchError(e=>this.errorHandler(e))
     );
  }



}
