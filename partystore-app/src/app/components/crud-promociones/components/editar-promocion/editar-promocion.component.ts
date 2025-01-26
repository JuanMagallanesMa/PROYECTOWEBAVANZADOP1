import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromocionService } from '../../services/promocion.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PromocioneModel } from '../../interfaces/promocion-model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CategoriaModel } from '../../interfaces/categoria.model';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-editar-promocion',
  standalone: true,
  imports: [
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './editar-promocion.component.html',
  styleUrl: './editar-promocion.component.css'
})
export class EditarPromocionComponent implements OnInit {

  public form!: FormGroup
  public loading = signal<boolean>(false)
  public categorias: CategoriaModel[] = []

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<EditarPromocionComponent>,
    private _snackBar: MatSnackBar,
    private _servicePromocion: PromocionService,
    private _servicioCategoria: CategoriasService,
    @Inject(MAT_DIALOG_DATA) public data: PromocioneModel
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategorias()
  }

  onSubmit() {
    if (this.loading()) return

    if (this.form.invalid) {
      this._snackBar.open('Por favor, complete todos los campos obligatorios.', 'Cerrar', { duration: 3000 });
      return
    }

    this.loading.update(() => true);
    const body: PromocioneModel = this.getPromoción()
    this._servicePromocion.actualizar(body).subscribe({
      next: (success: boolean) => {
        if (success) {
          this._snackBar.open('Promoción creada exitosamente.', 'Cerrar', { duration: 3000 });
          this._dialogRef.close(true);
        } else {
          this._snackBar.open('Error al crear la promoción. Intente más tarde.', 'Cerrar', { duration: 3000 });
        }
      },
      error: () => this._snackBar.open('Error inesperado. Intente más tarde.', 'Cerrar', { duration: 3000 }),
      complete: () => this.loading.update(() => false)
    });
  }

  onCancel() {
    this._dialogRef.close()
  }

  private getPromoción(): PromocioneModel {
    return {
      id: this.data.id,
      nombre: this.nombre.value,
      descripcion: this.descripcion.value,
      id_categoria: this.id_categoria.value,
      descuentoPorcentaje: this.descuentoPorcentaje.value,
      fechaFin: this.fechaFin.value,
      isActive: true,
    }
  }

  private loadCategorias() {
    this._servicioCategoria.obtenerTodos().subscribe({
      next: (data: CategoriaModel[]) => this.categorias = data,
      complete: () => this.loading.update(() => false)
    });
  }

  private initializeForm() {
    this.form = this._fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      id_categoria: ['', Validators.required],
      descuentoPorcentaje: ['', Validators.required],
      fechaFin: ['', Validators.required],
    })
    this.setForm(this.data)
  }

  private setForm(data: PromocioneModel) {
    const formatDate = new Date(data.fechaFin!);
    this.form.patchValue({
      nombre: data.nombre,
      descripcion: data.descripcion,
      id_categoria: data.id_categoria,
      descuentoPorcentaje: data.descuentoPorcentaje,
      fechaFin: formatDate.toISOString().split('T')[0],
    })
  }

  get nombre() { return this.form.get('nombre')!; }
  get descripcion() { return this.form.get('descripcion')!; }
  get id_categoria() { return this.form.get('id_categoria')!; }
  get descuentoPorcentaje() { return this.form.get('descuentoPorcentaje')!; }
  get fechaFin() { return this.form.get('fechaFin')!; }

}
