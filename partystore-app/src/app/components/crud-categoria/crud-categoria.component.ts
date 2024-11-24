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
    private categoriaService: CategoriajsonService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategorias();

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      estado: ['activo', Validators.required],
      edadesAplicables: [[], Validators.required],
      tiposEvento: [[], Validators.required],
    });
  }

  getCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((datos: Categoria[]) => {
      this.dataSource.data = datos;
    });
  }

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

  editar(categoria: Categoria): void {
    this.isEditMode = true;
    this.currentID = categoria.id;

    this.form.setValue({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      estado: categoria.estado,
      edadesAplicables: categoria.edadesAplicables,
      tiposEvento: categoria.tiposEvento,
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Formulario inválido');
      return;
    }

    const nuevaCategoria: Categoria = this.form.value;
    if (this.isEditMode) {
      nuevaCategoria.id = this.currentID;
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

  clearForm(): void {
    this.form.reset({
      nombre: '',
      descripcion: '',
      estado: 'activo',
      edadesAplicables: [],
      tiposEvento: [],
    });
    this.currentID = 0;
    this.isEditMode = false;
  }

  search(
    searchInput: HTMLInputElement,
    edadesAplicables?: string,
    tiposEvento?: string,
    estado?: string
  ): void {
    const searchTerm = searchInput.value.trim();

    this.categoriaService
      .buscarCategorias(searchTerm, edadesAplicables, tiposEvento, estado)
      .subscribe((categorias: Categoria[]) => {
        this.dataSource.data = categorias;
      });
  }
}
