import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoriaId: number;
  descuento: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Globos Temáticos', precio: 20, categoriaId: 1, descuento: 10 },
    { id: 2, nombre: 'Invitaciones Personalizadas', precio: 50, categoriaId: 2, descuento: 5 }
  ];

  getProductos(): Producto[] {
    return this.productos;
  }

  addProducto(producto: Producto): void {
    this.productos.push(producto);
  }

  deleteProducto(id: number): void {
    this.productos = this.productos.filter(producto => producto.id !== id);
  }
}
