import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoApiService {
  private apiweUrl = 'http://localhost:5169/api/Product'; 

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiweUrl);
  }

  // Obtener producto por ID
  getProductById(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiweUrl}/${id}`);
  }

  // Crear un nuevo producto
  crearProducto(producto: Producto): Observable<Producto> {
    
    if (!producto.nombre || !producto.precio || !producto.categoryId) {
      throw new Error(
        'El producto debe tener un nombre, precio y categoría asignados.'
      );
    }

    
    const body = {
      nombre: producto.nombre,
      descripcion: producto.descripcion || '', 
      precio: producto.precio,
      stock: producto.stock || 0, 
      categoriaId: producto.categoryId,
    };

    return this.http.post<Producto>(this.apiweUrl, body);
  }

  // Actualizar producto existente
  actualizarProducto(producto: Producto): Observable<Producto> {
    if (!producto.id) {
      throw new Error('El producto debe tener un ID para ser actualizado.');
    }

    const urlProducto = `${this.apiweUrl}/${producto.id}`;
    return this.http.put<Producto>(urlProducto, producto);
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<void> {
    const urlProducto = `${this.apiweUrl}/${id}`;
    return this.http.delete<void>(urlProducto);
  }

  // Eliminación lógica de un producto
  deactiveProducto(id: number): Observable<void> {
    const urlProducto = `${this.apiweUrl}/deactive/${id}`;
    return this.http.delete<void>(urlProducto);
  }
}
