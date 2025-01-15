import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../../models/Producto'; 
import { ProductoService } from '../../services/producto.service';
import { TableComponent } from '../shared/table/table.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';

@Component({
  selector: 'app-crud-producto', 
  standalone: true,
  templateUrl: './crud-producto.component.html', 
  styleUrls: ['./crud-producto.component.css'],  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    TableComponent,
    FormsModule,
  ],
})
export class CrudProductoComponent implements OnInit { 
  form!: FormGroup;
  isEditMode = false;
  currentID!: number;
  dataSource = new MatTableDataSource<Producto>(); 
  searchValue: string = ''; 

  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'categoria', 'estado','stock', 'acciones' ]; 
  columnAliases = {
    nombre: 'Nombre',
    descripcion: 'Descripción',
    precio: 'Precio',
    categoria: 'Categoría',
    estado: 'Estado',
    stock: 'Stock',
    acciones: 'Acciones',
  };
  categoriasDisponibles: any;
  activoSeleccionado: boolean = false;
  inactivoSeleccionado: boolean = false;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      estado: [[]],
    });
  }

  ngOnInit(): void {
    this.getProductos();

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      estado: ['activo', Validators.required],
      categoria: ['', Validators.required], 
    });

    // Configuración del filtro de MatTableDataSource
    this.dataSource.filterPredicate = (data: Producto, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      return (
        data.nombre.toLowerCase().includes(searchTerm) ||
        data.descripcion.toLowerCase().includes(searchTerm) ||
        (data.categoria ? data.categoria.toLowerCase().includes(searchTerm) : false)
      );
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.searchValue; 
  }

  getProductos(): void {
    this.productoService.obtenerProductos().subscribe((datos: Producto[]) => {
      this.dataSource.data = datos;
    });
  }

  eliminar(producto: Producto): void {
    const dialogRef = this.dialog.open(MyDialogComponent,{
      data:{
        titulo: 'Eliminación del Producto',
        contenido: `¿Estás seguro de eliminar el producto ${producto.nombre}?`,
      },
    });
    
    dialogRef.afterClosed().subscribe((result)=>{
      if(result === 'aceptar'){
        this.productoService.eliminarProducto(producto.id).subscribe(()=>{
          alert('Producto eliminado exitosamente');
          this.getProductos();
        });
      }
    });
  }

  editar(producto: Producto): void {
    this.isEditMode = true;
    this.currentID = producto.id; 

    this.form.setValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      estado: producto.estado,
      categoria: producto.categoria,
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Formulario inválido');
      return;
    }

    const nuevoProducto: Producto = this.form.value;
    if (this.isEditMode) {
      nuevoProducto.id = this.currentID; 
      this.productoService.actualizarProducto(nuevoProducto).subscribe(() => {
        alert('Producto actualizado');
        this.getProductos();
        this.clearForm();
      });
    } else {
      this.productoService.crearProducto(nuevoProducto).subscribe(() => {
        alert('Producto creado');
        this.getProductos();
        this.clearForm();
      });
    }
  }

  clearForm(): void {
    this.form.reset({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      estado: 'activo',
      categoria: '',
    });
    this.currentID = 0;
    this.isEditMode = false;
  }
}
