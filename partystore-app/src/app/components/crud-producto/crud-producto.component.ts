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
import { ProductoApiService } from '../../services/producto-api.service';
import { Categoria } from '../../models/Categoria';
import { CategoriaApiService } from '../../services/categoria-api.service';

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
  categoriasDisponibles: Categoria[] = [];

  displayedColumns: string[] = [
    'nombre', 
    'descripcion', 
    'precio', 
    'categoria', 
    'isActive', 
    'stock', 
    'imagen', 
    'acciones'
  ]; 
  columnAliases = {
    nombre: 'Nombre',
    descripcion: 'Descripción',
    precio: 'Precio',
    categoria: 'Categoría',
    isActive: 'Activo',
    stock: 'Stock',
    imagen: 'Imagen',
    acciones: 'Acciones',
  };

  constructor(
    private productoService: ProductoService, 
    private categoriaService: CategoriaApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getProductos();
    this.getCategorias();
    this.configurarFiltroTabla();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      isActive: ['activo', Validators.required],
      categoria: ['', Validators.required], 
      imagen: ['', Validators.required],
    });
  }

  private configurarFiltroTabla(): void {
    this.dataSource.filterPredicate = (data: Producto, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      const categoriaNombre = this.categoriasDisponibles.find(
        (categoria) => categoria.id === data.categoryId
      )?.nombre || ''; 
    
      return (
        data.nombre.toLowerCase().includes(searchTerm) ||
        data.descripcion.toLowerCase().includes(searchTerm) ||
        categoriaNombre.toLowerCase().includes(searchTerm) 
      );
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchValue = filterValue;
    this.dataSource.filter = filterValue;
  }

  getProductos(): void {
    this.productoService.obtenerProductos().subscribe((productos: Producto[]) => {
      this.dataSource.data = productos;
    });
  }

  getCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((categorias: Categoria[]) => {
      this.categoriasDisponibles = categorias;
    });
  }

  /**
   * Método para obtener el ID de la categoría seleccionada
   */
  obtenerCategoriaId(categoriaNombre: string): number | null {
    const categoria = this.categoriasDisponibles.find(
      (cat) => cat.nombre === categoriaNombre
    );
    return categoria ? categoria.id : null;
  }

  eliminar(producto: Producto): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        titulo: 'Eliminar Producto',
        contenido: `¿Estás seguro de eliminar el producto "${producto.nombre}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'aceptar') {
        this.productoService.eliminarProducto(producto.id).subscribe(() => {
          alert('Producto eliminado exitosamente');
          this.getProductos();
        });
      }
    });
  }

  editar(producto: Producto): void {
    this.isEditMode = true;
    this.currentID = producto.id; 

    this.form.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      isActive: producto.isActive ? 'activo' : 'inactivo',
      categoria: producto.categoryId, 
      imagen: producto.imagen,
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const producto: Producto = {
      ...this.form.value,
      id: this.isEditMode ? this.currentID : undefined,
      categoriaId: this.form.value.categoria, 
    };

    if (this.isEditMode) {
      this.productoService.actualizarProducto(producto).subscribe(() => {
        alert('Producto actualizado exitosamente');
        this.getProductos();
        this.clearForm();
      });
    } else {
      this.productoService.crearProducto(producto).subscribe(() => {
        alert('Producto creado exitosamente');
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
      isActive: 'activo',
      categoria: '',
      imagen: '',
    });
    this.isEditMode = false;
    this.currentID = 0;
  }
}