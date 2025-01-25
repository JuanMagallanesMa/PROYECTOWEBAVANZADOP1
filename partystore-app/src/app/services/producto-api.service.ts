import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/Producto'; 
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoApiService {

  private apiURL = 'http://localhost:5169/api/Productos'; // URL del API backend

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiURL);
  }

  // Buscar productos por nombre o descripción
  buscarProductos(
    termino: string = '',
    categoria?: string,
    precioMin?: number,
    precioMax?: number
  ): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiURL).pipe(
      map((productos) =>
        productos.filter((producto) => {
          const coincideNombre = termino
            ? producto.nombre.toLowerCase().includes(termino.toLowerCase()) ||
              producto.descripcion.toLowerCase().includes(termino.toLowerCase())
            : true;

            const coincideCategoria = categoria
            ? String(producto.categoryId).toLowerCase().includes(String(categoria).toLowerCase())
            : true;

          const coincidePrecio = (precioMin && precioMax)
            ? producto.precio >= precioMin && producto.precio <= precioMax
            : true;

          return coincideNombre && coincideCategoria && coincidePrecio;
        })
      )
    );
  }

  // Crear un nuevo producto
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiURL, producto);
  }

  // Actualizar un producto existente
  actualizarProducto(producto: Producto): Observable<Producto> {
    const urlProducto = `${this.apiURL}/${producto.id}`;
    return this.http.put<Producto>(urlProducto, producto);
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<void> {
    const urlProducto = `${this.apiURL}/${id}`;
    return this.http.delete<void>(urlProducto);
  }
}
