import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos';
  
  // Lista de productos en el carrito (puedes usar localStorage para persistencia)
  private productosEnCarrito: Producto[] = [];

  constructor(private http: HttpClient) {}

  // Obtener los productos en el carrito
  obtenerProductosCart(): Producto[] {
    // Retorna los productos en el carrito desde la memoria
    return this.productosEnCarrito;
    // Si usas localStorage:
    // return JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  // Agregar un producto al carrito
  agregarProductoCart(producto: Producto): void {
    this.productosEnCarrito.push(producto);
    // Si usas localStorage, puedes almacenar el carrito de esta forma:
    // localStorage.setItem('carrito', JSON.stringify(this.productosEnCarrito));
  }

  // Obtener todos los productos desde la API
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Crear un nuevo producto
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  // Actualizar un producto existente
  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${producto.idProducto}`, producto);
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Buscar productos con términos de búsqueda
  buscarProductos(searchTerm: string, categoria?: string, estado?: string): Observable<Producto[]> {
    let url = `${this.apiUrl}?q=${searchTerm}`;
    if (categoria) {
      url += `&categoria=${categoria}`;
    }
    if (estado) {
      url += `&estado=${estado}`;
    }
    return this.http.get<Producto[]>(url);
  }
}
