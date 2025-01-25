import { CurrencyPipe, CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ProductoService } from '../../services/producto.service';
import { MatListModule } from '@angular/material/list';
import { Producto } from '../../models/Producto';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PedidosjsonService } from '../../services/pedidosjson.service';
import { CartService } from '../../services/cart.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-lista-producto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css'],
})
export class ListaProductoComponent implements OnInit {
  @Input() productos: Producto[] = [];
  cantidades: { [productId: number]: number } = {}; // Cambié el nombre de la propiedad a plural
  
  constructor(private productoService: ProductoService, private pedidoService:PedidosjsonService, private router: Router
    ,private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.mostrarProductos(); // Llamada a la función para cargar productos
  }

  mostrarProductos(): void {
    this.productoService.obtenerProductos().subscribe((data: Producto[]) => {
      this.productos = data; // Asignación de los productos al arreglo
    });
  }

  agregarAlCarrito(producto: Producto): void {
    const cantidad = this.cantidades[producto.id];
    if (cantidad) {
      this.cartService.addToCart({
        productId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        subtotal: producto.precio * cantidad,
        stock: producto.stock,
      });
      alert('Producto agregado al carrito');
    }
  }

  generarArrayDeStock(stock: number): number[] {
    return Array.from({ length: stock }, (_, i) => i + 1);
  }
  irAlCarrito(): void {
    this.router.navigate(['/pedidos']); // Navega a la ruta del componente Pedidos
  }

  
}

