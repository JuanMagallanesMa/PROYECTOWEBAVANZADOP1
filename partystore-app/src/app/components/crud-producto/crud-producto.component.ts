import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/Producto'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./crud-producto.component.css']
})

export class CrudProductoComponent implements OnInit {
  productos: any[] = [];
  productoForm: any;  
  searchText: string = '';
  productoSeleccionado: Producto | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  onSearchChange(): void {
    if (this.searchText.trim()) {
      this.productos = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.cargarProductos();
    }
  }

  crearProducto(): void {
    if (this.productoForm.valid) {
      const nuevoProducto: Producto = this.productoForm.value;
      this.productoService.crearProducto(nuevoProducto).subscribe(producto => {
        this.productos.push(producto);
        this.productoForm.reset();
      });
    }
  }

  actualizarProducto(): void {
    if (this.productoForm.valid && this.productoSeleccionado) {
      const productoActualizado: Producto = this.productoForm.value;
      productoActualizado.id = this.productoSeleccionado.id; 
      this.productoService.actualizarProducto(productoActualizado).subscribe(() => {
        const index = this.productos.findIndex(p => p.id === productoActualizado.id);
        if (index !== -1) {
          this.productos[index] = productoActualizado;
        }
        this.productoForm.reset();
        this.productoSeleccionado = null;
      });
    }
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')){
      this.productoService.eliminarProducto(id).subscribe({
        next:()=>{
          this.productos=this.productos.filter(producto=>producto.id !==id);
          console.log('Producto eliminado');
        },
        error:(err)=>{
          console.error('Error al eliminar producto:',err);
        }
      });
    }
  }

  seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.productoForm.setValue({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      descripcion: producto.descripcion
    });
  }

  cancelarEdicion(): void {
    this.productoForm.reset();
    this.productoSeleccionado = null;
  }
}

