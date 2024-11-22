import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  [x: string]: any;
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  // Obtener productos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<{ productos: Producto[] }>(this.apiUrl).pipe(
      map((response: { productos: any;}) => response.productos), 
      catchError(err => {
        console.error('Error al obtener productos:', err);
        return of([]);  
      })
    );
  }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.apiUrl);
  } 

  // Agregar un producto
  agregarProducto(producto: Producto): Observable<Producto> {
    return of(producto).pipe(
      map(newProduct => {
        console.log('Producto agregado:', newProduct);
        return newProduct; 
      }),
      catchError(err => {
        console.error('Error al agregar producto:', err);
        return of(producto); 
      })
    );
  }

  // Actualizar un producto
  editarProducto(producto: Producto): Observable<Producto> {
    return of(producto).pipe(
      map(updatedProduct => {
        console.log('Producto actualizado:', updatedProduct);
        return updatedProduct; 
      }),
      catchError(err => {
        console.error('Error al editar producto:', err);
        return of(producto); 
      })
    );
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<number> {
    return of(id).pipe(
      map(deletedId => {
        console.log('Producto eliminado con ID:', deletedId);
        return deletedId; 
      }),
      catchError(err => {
        console.error('Error al eliminar producto:', err);
        return of(id); 
      })
    );
  }
}
