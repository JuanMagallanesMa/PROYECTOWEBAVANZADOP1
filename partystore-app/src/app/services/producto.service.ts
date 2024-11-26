import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto'; 

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos'; 

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  eliminarProducto(id: number): Observable<void> {
    const urlProducto = `${this.apiUrl}/${id}`;  
    return this.http.delete<void>(urlProducto);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  actualizarProducto(producto: Producto): Observable<Producto> {
    const urlProducto = `${this.apiUrl}/${producto.id}`; 
    return this.http.put<Producto>(urlProducto, producto);
  }

  // Método adicional para agregar productos al carrito 
  agregarProductoCart(producto: Producto): Observable<Producto> {
    throw new Error('Method not implemented.');
  }
}
