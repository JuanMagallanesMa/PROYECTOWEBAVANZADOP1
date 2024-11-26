import { CurrencyPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ProductoService } from '../../services/producto.service';
import { MatListModule } from '@angular/material/list';
import { Producto } from '../../models/Producto';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  ],
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css'],
})
export class ListaProductoComponent implements OnInit {
  productos: Producto[] = []; // Cambié el nombre de la propiedad a plural

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.mostrarProductos(); // Llamada a la función para cargar productos
  }

  mostrarProductos(): void {
    this.productoService.obtenerProductos().subscribe((data: Producto[]) => {
      this.productos = data; // Asignación de los productos al arreglo
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.productoService.agregarProductoCart(producto);
    console.log('Producto agregado al carrito:', producto); // Consola para depuración
  }

  irAlCarrito(): void {
    this.router.navigate(['/pedidos']); // Navega a la ruta del componente Pedidos
  }

  trackByFn(index: number, item: Producto): number {
    return item.idProducto; // Usa la propiedad idProducto como clave única
  }
}

