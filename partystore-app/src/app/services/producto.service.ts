import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}



  // Obtener productos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<{ productos: Producto[] }>(this.apiUrl).pipe(
      map((response: { productos: Producto[] }) => response.productos),
      catchError((err) => {
        console.error('Error al obtener productos:', err);
        return of([]);  
      })
    );
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Agregar un producto
  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto).pipe(
      map((newProduct) => {
        console.log('Producto agregado:', newProduct);
        return newProduct;
      }),
      catchError((err) => {
        console.error('Error al agregar producto:', err);
        return of(producto);
      })
    );
  }

  // Actualizar un producto
  editarProducto(producto: Producto): Observable<Producto> {
    const url = `${this.apiUrl}/${producto.idProducto}`;
    return this.http.put<Producto>(url, producto).pipe(
      map((updatedProduct) => {
        console.log('Producto actualizado:', updatedProduct);
        return updatedProduct;
      }),
      catchError((err) => {
        console.error('Error al editar producto:', err);
        return of(producto);
      })
    );
  }
  deleteProducto(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(error => {
          console.error('Error al eliminar el producto', error);
          return throwError(error);
        })
      );
  }

  // Eliminar un producto
  eliminarProducto(id: Producto): Observable<void> {
    const url = `${this.apiUrl}/${id.idProducto}`;
    return this.http.delete<void>(url).pipe(
      map(() => {
        console.log(`Producto con ID ${id.idProducto} eliminado correctamente.`);
      }),
      catchError((err) => {
        console.error('Error al eliminar producto:', err);
        return of();
      })
    );
  }

  // Seleccionar producto
  private productoSeleccionado = new BehaviorSubject<Producto | null>(null);
  productoSeleccionado$ = this.productoSeleccionado.asObservable();

  seleccionarProducto(producto: Producto) {
    this.productoSeleccionado.next(producto);
  }

  // Manejo del carrito
  

 
}
