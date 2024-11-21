import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  standalone: true,
  selector: 'app-crud-producto',
  templateUrl: './crud-product.component.html',
  styleUrls: ['./crud-product.component.css'],
  imports: [CommonModule, FormsModule, MatTableModule, MatSelectModule],
  providers: [ProductoService, CategoriaService]
})
export class CrudProductoComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  /**productos: Producto[] = [];
  categorias: Categoria[] = [];
  nombreProducto: string = '';
  precioProducto: number = 0;
  categoriaProducto: number = 0;
  descuentoProducto: number = 0;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos(): void {
    this.productos = this.productoService.getProductos();
  }

  obtenerCategorias(): void {
    this.categorias = this.categoriaService.getCategorias();
  }

  crearProducto(): void {
    if (
      this.nombreProducto.trim() &&
      this.precioProducto > 0 &&
      this.categoriaProducto &&
      this.descuentoProducto >= 0
    ) {
      const nuevoProducto: Producto = {
        id: Date.now(),
        nombre: this.nombreProducto,
        precio: this.precioProducto,
        categoriaId: this.categoriaProducto,
        descuento: this.descuentoProducto
      };
      this.productoService.addProducto(nuevoProducto);
      this.obtenerProductos();
      this.limpiarFormulario();
    }
  }

  eliminarProducto(producto: Producto): void {
    this.productoService.deleteProducto(producto.id);
    this.obtenerProductos();
  }

  limpiarFormulario(): void {
    this.nombreProducto = '';
    this.precioProducto = 0;
    this.categoriaProducto = 0;
    this.descuentoProducto = 0;
  }
    */
}
