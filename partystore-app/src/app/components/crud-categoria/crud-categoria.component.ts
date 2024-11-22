import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { CategoriajsonService } from '../../services/categoriajson.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { filter } from 'rxjs';
import { Categoria } from '../../models/Categoria';

@Component({
  selector: 'app-crud-categoria',
  standalone: true,
    imports: [MatFormField,
        MatLabel,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatOptionModule,
        MatFormFieldModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        CommonModule,
        
        
        
    ],
  templateUrl: './crud-categoria.component.html',
  styleUrls: ['./crud-categoria.component.css']
})
export class CrudCategoriaComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  isEditMode = false;
  currentID!: number;
  dataSource = new MatTableDataSource<Categoria>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      urlImagen: ['', Validators.required],
      estado: ['activo', Validators.required],
      edadesAplicables: [[], Validators.required],
      tiposEvento: [[], Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
        contenido: `¿Estás seguro de eliminar la categoría ${categoria.nombre}?`
      }
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


  editar(categoria: Categoria): void {
    this.isEditMode = true;
    this.currentID = categoria.id;

    this.form.setValue({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      urlImagen: categoria.urlImagen,
      estado: categoria.estado,
      edadesAplicables: categoria.edadesAplicables,
      tiposEvento: categoria.tiposEvento
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
      urlImagen: '',
      estado: 'activo',
      edadesAplicables: [],
      tiposEvento: []
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
