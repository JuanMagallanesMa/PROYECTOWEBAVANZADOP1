import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  actualizarProducto(producto: Producto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${producto.id}`, producto);
  }

  eliminarProducto(id: number): Observable<void> {
    const url=`${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

