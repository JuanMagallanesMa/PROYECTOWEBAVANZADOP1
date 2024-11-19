import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:3000/products';  // Ruta del archivo JSON local

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Crear un nuevo producto (simulado)
  createProducto(producto: Producto): Observable<Producto> {
    // Lógica para agregar el producto al JSON (simulada)
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  // Actualizar un producto (simulado)
  updateProducto(id: number, producto: Producto): Observable<Producto> {
    // Lógica para actualizar el producto en el JSON (simulada)
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  // Eliminar un producto (simulado)
  deleteProducto(id: number): Observable<void> {
    // Lógica para eliminar el producto del JSON (simulada)
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
