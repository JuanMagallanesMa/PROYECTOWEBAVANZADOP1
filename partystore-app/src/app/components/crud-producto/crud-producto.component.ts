import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crud-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent {
  productos: any[] = [];
  categorias: any[] = [];
  productosFiltrados: any[] = [];
  carrito: any[] = [];
  mostrarCarrito: boolean = false;
  categoriasSeleccionadas: Set<number> = new Set();

  constructor(private productoService: ProductoService) {
    this.cargarDatos();
  }

  cargarDatos() {
    this.productoService.getDatos().subscribe((datos) => {
      this.productos = datos.productos;
      this.categorias = datos.categorias;
      this.productosFiltrados = [...this.productos];
    });
  }

  getCategoriaNombre(categoriaId: number): string {
    const categoria = this.categorias.find((cat) => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Desconocida';
  }

  buscarProducto(searchTerm: string) {
    this.productosFiltrados = this.productos.filter(
      (producto) =>
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (this.categoriasSeleccionadas.size === 0 ||
          this.categoriasSeleccionadas.has(producto.categoriaId))
    );
  }

  filtrarPorCategorias(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.categoriasSeleccionadas = new Set(
      Array.from(selectElement.selectedOptions, (option) =>
        parseInt(option.value)
      )
    );
    this.buscarProducto('');
  }

  agregarAlCarrito(producto: any) {
    this.carrito.push(producto);
  }

  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
  }

  toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }
}
