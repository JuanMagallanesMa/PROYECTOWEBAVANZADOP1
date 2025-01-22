import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from '../../models/Categoria';
import { CategoriaApiService } from '../../services/categoria-api.service'; // Servicio API
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
    TableComponent,
  ],
})
export class CrudCategoriaComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  currentID!: number;
  dataSource = new MatTableDataSource<Categoria>();

  displayedColumns: string[] = ['nombre', 'descripcion', 'tiposEvento', 'edadesAplicables', 'estado', 'acciones'];
  columnAliases = {
    nombre: 'Nombre',
    descripcion: 'Descripción',
    tiposEvento: 'Tipos de Evento',
    edadesAplicables: 'Edades Aplicables',
    estado: 'Estado',
    acciones: 'Acciones',
  };

  constructor(
    private categoriaService: CategoriaApiService, // Servicio actualizado
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategorias();

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      estado: ['activo', Validators.required], // Valor por defecto
      edadesAplicables: [[], Validators.required], // Asegurarse de que sea un arreglo
      tiposEvento: [[], Validators.required], // Asegurarse de que sea un arreglo
    });
  }

  // Obtener las categorías desde el servicio
  getCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((datos: Categoria[]) => {
      this.dataSource.data = datos;
    });
  }

  // Eliminar una categoría
  eliminar(categoria: Categoria): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        titulo: 'Eliminación de Categoría',
        contenido: `¿Estás seguro de eliminar la categoría ${categoria.nombre}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'aceptar') {
        this.categoriaService.eliminarCategoria(categoria.id).subscribe(() => {
          alert('Categoría eliminada exitosamente');
          this.getCategorias();
        });
      }
    });
  }

  // Editar una categoría
  editar(categoria: Categoria): void {
    this.isEditMode = true;
    this.currentID = categoria.id;

    // Cargar los valores en el formulario (asegúrate de que las edades y tipos de evento estén correctamente configurados)
    this.form.setValue({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      estado: categoria.estado,
      edadesAplicables: categoria.edadesAplicables || [], // Verificar que se pase un arreglo
      tiposEvento: categoria.tiposEvento || [], // Verificar que se pase un arreglo
    });
  }

  // Enviar formulario para crear o actualizar
  onSubmit(): void {
    if (this.form.invalid) {
      alert('Formulario inválido');
      return;
    }

    const nuevaCategoria: Categoria = {
      ...this.form.value,
      id: this.isEditMode ? this.currentID : this.generateId(),
    };

    if (this.isEditMode) {
      this.categoriaService.actualizarCategoria(nuevaCategoria).subscribe(() => {
        alert('Categoría actualizada');
        this.getCategorias();
        this.clearForm();
      });
    } else {
      this.categoriaService.crearCategoria(nuevaCategoria).subscribe(() => {
        alert('Categoría creada');
        this.getCategorias();
        this.clearForm();
      });
    }
  }

  // Generar un nuevo ID para la categoría (esto es temporal)
  generateId(): number {
    const maxId = this.dataSource.data.reduce((max, item) => (item.id > max ? item.id : max), 0);
    return maxId + 1;
  }

  // Limpiar el formulario
  clearForm(): void {
    this.form.reset({
      nombre: '',
      descripcion: '',
      estado: '',
      edadesAplicables: [],
      tiposEvento: [],
    });
    this.currentID = 0;
    this.isEditMode = false;
  }

  // Buscar categorías con filtros
  search(searchInput: HTMLInputElement, edadesAplicables?: string, tiposEvento?: string, estado?: string): void {
    const searchTerm = searchInput.value.trim();
    this.categoriaService
      .buscarCategorias(searchTerm, edadesAplicables, tiposEvento, estado)
      .subscribe((categorias: Categoria[]) => {
        this.dataSource.data = categorias;
      });
  }
}
