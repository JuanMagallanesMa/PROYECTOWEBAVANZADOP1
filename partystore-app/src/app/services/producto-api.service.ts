import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto'; 


@Injectable({
  providedIn: 'root'
})
export class ProductoApiService {

   private apiweUrl = 'http://localhost:5169/api/Product'; 
  
    constructor(private http: HttpClient) {}
  
    obtenerProductos(): Observable<Producto[]> {
      return this.http.get<Producto[]>(this.apiweUrl);
    }
    getProductById(id: string): Observable<any> {
      return this.http.get<any>(`${this.apiweUrl}/${id}`);
    }
  
    eliminarProducto(id: number): Observable<void> {
      const urlProducto = `${this.apiweUrl}/${id}`;  
      return this.http.delete<void>(urlProducto);
    }
  
    crearProducto(producto: Producto): Observable<Producto> {
      return this.http.post<Producto>(this.apiweUrl, producto);
    }
  
    actualizarProducto(producto: Producto): Observable<Producto> {
      const urlProducto = `${this.apiweUrl}/${producto.id}`; 
      return this.http.put<Producto>(urlProducto, producto);
    }
  
    
    //eliminacion logica
    deactiveProducto(id: number): Observable<void> {
      const urlProducto = `${this.apiweUrl}/deactive/${id}`;  
      return this.http.delete<void>(urlProducto);
    }
}
