import { Component } from '@angular/core';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../shared/table/table.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crud-producto',
  standalone: true,
  imports: [FormsModule, RouterModule, TableComponent, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule],
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})

export class CrudProductoComponent{

  productos: Producto[] = [];  
  nuevoProducto: Producto = {
    idProducto: 0,
    nombre: '',
    categoria: '',
    precio: 0,
    descripcion: ''
  };
  buscador: string = ''; 
  productoEnEdicion: Producto | null = null;  

  constructor(private productoService: ProductoService) {}
  dataSource = new MatTableDataSource<Producto>();

  //definir las columnas
  displayedColumns: string[]=['id','nombre','categoria','precio','descripcion','acciones'];
  columnAliases={id: 'id', nombre: 'Nombre', categoria: 'Categoria', precio: 'Precio', descripcion: 'Descripcion',acciones: 'Acciones'};

  ngOnInit() {
      this.cargarProductos();
  }

  // Método para cargar productos
  cargarProductos(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.dataSource.data = productos;
    });
  }

  // Método para guardar o crear un producto
  guardarProducto(): void {
    if (this.productoEnEdicion) {
      this.productoService.editarProducto(this.nuevoProducto).subscribe(() => {
        const index = this.productos.findIndex(p => p.idProducto === this.nuevoProducto.idProducto);
        if (index > -1) {
          this.productos[index] = { ...this.nuevoProducto };
        }
        this.productoEnEdicion = null;
        this.resetProducto();
      });
    } else {
      this.productoService.agregarProducto(this.nuevoProducto).subscribe(nuevoProducto => {
        this.productos.push(nuevoProducto);
        this.resetProducto();
      });
    }
  }

  guardarProducto1(): void {
    if (this.productoEnEdicion) {
      this.productoService.editarProducto(this.nuevoProducto).subscribe(() => {
        const index = this.dataSource.data.findIndex(p => p.idProducto === this.nuevoProducto.idProducto);
        if (index > -1) {
          this.dataSource.data[index]={...this.nuevoProducto};
          this.dataSource.data=[...this.dataSource.data];
        }
        this.productoEnEdicion = null;
        this.resetProducto();
      });
    } else {
      this.productoService.agregarProducto(this.nuevoProducto).subscribe(nuevoProducto => {
        this.dataSource.data = [...this.dataSource.data, nuevoProducto];
        this.resetProducto();
      });
    }
  }

  // Método para eliminar un producto
  eliminarProducto(product: Producto): void {
    this.productoService.eliminarProducto(product).subscribe({
      next: () => {
        console.log(`Producto con ID ${product.idProducto} eliminado correctamente.`);
        this.cargarProductos(); 
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
      }
    });
  }
  


  // Método para reiniciar los campos del producto
  resetProducto(): void {
    this.nuevoProducto = {
      idProducto: 0,
      nombre: '',
      categoria: '',
      precio: 0,
      descripcion: ''
    };
  }

  // Método para buscar productos
  buscarProductos() {
    if (this.buscador.trim() !== '') {
      this.productos = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(this.buscador.toLowerCase())||
        producto.categoria.toLowerCase().includes(this.buscador.toLowerCase())
      );
    } else {
      this.resetProducto();
    }
  }

  buscarProductos1() {
    if (this.buscador.trim() !== '') {
      const productosFiltrados = this.productos.filter(producto=>
        producto.nombre.toLowerCase().includes(this.buscador.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(this.buscador.toLowerCase())
      );
      this.dataSource.data = productosFiltrados;
    } else {
      this.resetProducto();
      this.dataSource.data = this.productos;
    }
  }

  // Método para editar un producto
  editarProducto(producto: Producto) {
    this.productoEnEdicion = { ...producto };  
    this.nuevoProducto = { ...producto };  
  }

  handleEdit(producto: Producto){
    this.editarProducto(producto);
    console.log('Editar producto:', producto);
  }

  handleDelete(product: Producto): void {
    this.eliminarProducto(product);
}
}
