import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../models/Producto';
import { CartItem } from '../interface/CartItem';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'shoppingCart';

  constructor() {}

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addToCart(item: CartItem): void {
    const cart = this.getCart();
    const existingItem = cart.find((i) => i.productId === item.productId);

    if (existingItem) {
      existingItem.cantidad = item.cantidad;
      existingItem.subtotal = existingItem.cantidad * existingItem.precio;
    } else {
      cart.push(item);
    }

    this.saveCart(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart(); // Obtener el carrito actual
    const updatedCart = cart.filter((item) => item.productId !== productId);
    this.saveCart(updatedCart);
    this.getCart();
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
  
}


