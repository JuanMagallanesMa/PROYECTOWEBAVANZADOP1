import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from '../../models/Categoria';
import { CategoriajsonService } from '../../services/categoriajson.service';
import { TableComponent } from '../shared/table/table.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { CategoriaApiService } from '../../services/categoria-api.service';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-crud-categoria',
  standalone: true,
  templateUrl: './crud-categoria.component.html',
  styleUrls: ['./crud-categoria.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule,
  ],
})
export class CrudCategoriaComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean = false;
  currentId!: number; 
  dataSource = new MatTableDataSource<Categoria>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoriaService: CategoriaApiService,
    private fb: FormBuilder,
    private mydialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategorias();
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      estado: ['activo', Validators.required],
      edadesAplicables: [[]], // Lista de edades
      tiposEvento: [[]] // Lista de tipos de evento
    });
  }

  // Obtener todas las categorías
  getCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((categorias: Categoria[]) => {
      this.dataSource.data = categorias;
    });
  }

  // Buscar categorías
  search(searchInput: HTMLInputElement, edad: string, tipo: string, estado: string): void {
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Aquí implementa la lógica para filtrar los datos según los parámetros.
    console.log('Búsqueda:', { searchTerm, edad, tipo, estado });
  }
  

  // Eliminar categoría
  eliminar(categoria: Categoria): void {
    const dialogRef = this.mydialog.open(MyDialogComponent, {
      data: {
        titulo: 'Eliminación de categoría',
        contenido: `¿Estás seguro de eliminar la categoría: ${categoria.nombre}?`
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        this.categoriaService.eliminarCategoria(categoria.id).subscribe(() => {
          alert('Categoría eliminada exitosamente');
          this.getCategorias();
        });
      }
    });
  }

  // Editar categoría
  editar(categoria: Categoria): void {
    this.isEditMode = true;
    if (categoria && categoria.id) {
      this.currentId = categoria.id;
      this.form.setValue({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        estado: categoria.estado,
        edadesAplicables: categoria.edadesAplicables,
        tiposEvento: categoria.tiposEvento
      });
    }
  }

  // Enviar el formulario para agregar o actualizar la categoría
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const categoria: Categoria = this.form.value;
    if (this.isEditMode) {
      categoria.id = this.currentId;
      this.categoriaService.actualizarCategoria(categoria).subscribe(() => {
        alert('Categoría editada exitosamente');
        this.getCategorias();
      });
    } else {
      this.categoriaService.crearCategoria(categoria).subscribe(() => {
        alert('Categoría agregada exitosamente');
        this.getCategorias();
      });
    }

    this.clearForm();
  }

  // Limpiar el formulario
  clearForm(): void {
    this.form.reset({
      nombre: '',
      descripcion: '',
      estado: 'activo',
      edadesAplicables: [],
      tiposEvento: []
    });
    this.currentId = 0;
    this.isEditMode = false;
  }
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado', 'acciones'];

}