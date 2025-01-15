import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../models/Producto';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Map<number, Producto> = new Map();
  private cartSubject = new BehaviorSubject<Producto[]>([]);

  // Obtener los ítems del carrito como observable
  getCartItems(): Observable<Producto[]> {
    return this.cartSubject.asObservable();
  }

  // Agregar un producto al carrito (aumentar cantidad si ya existe)
  addToCart(producto: Producto, cantidad: number = 1): void {
    if (this.cartItems.has(producto.id)) {
      const existing = this.cartItems.get(producto.id)!;
      existing.stock += cantidad;
    } else {
      this.cartItems.set(producto.id, { ...producto, stock: cantidad });
    }
    this.updateCart();
  }

  // Actualizar la cantidad de un producto en el carrito
  updateQuantity(productId: number, cantidad: number): void {
    if (this.cartItems.has(productId)) {
      const item = this.cartItems.get(productId)!;
      if (cantidad > 0) {
        item.stock = cantidad;
      } else {
        this.cartItems.delete(productId); // Si la cantidad es 0, eliminar del carrito
      }
      this.updateCart();
    }
  }

  // Eliminar un producto del carrito
  removeFromCart(productId: number): void {
    if (this.cartItems.has(productId)) {
      this.cartItems.delete(productId);
      this.updateCart();
    }
  }

  // Vaciar el carrito
  clearCart(): void {
    this.cartItems.clear();
    this.updateCart();
  }

  // Obtener el total del carrito
  getTotal(): number {
    return Array.from(this.cartItems.values()).reduce(
      (total, item) => total + item.precio * item.stock,
      0
    );
  }

  // Actualizar el carrito
  private updateCart(): void {
    this.cartSubject.next(Array.from(this.cartItems.values()));
  }
}


