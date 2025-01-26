import { Component } from '@angular/core';
import { Proveedor } from '../../models/Proveedor';
import { ProveedorService } from '../../services/proveedor.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crud-proveedores',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './crud-proveedores.component.html',
  styleUrls: ['./crud-proveedores.component.css']
})
export class CrudProveedoresComponent {
  title: string = 'Gestión de Proveedores';
  proveedores: Proveedor[] = [];
  form!: FormGroup;
  isEditMode: boolean = false;
  currentId!: string; 
  buscador: string = '';
  dataSource = new MatTableDataSource<Proveedor>();

  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'direccion', 'acciones'];
  columnAliases = { nombre: 'Nombre', email: 'Correo', telefono: 'Teléfono', direccion: 'Dirección', acciones: 'Acciones' };

  constructor(
    private proveedorService: ProveedorService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarProveedores();
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      direccion: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      isActive: [true]
    });
  }

  cargarProveedores(): void {
    this.proveedorService.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
      this.dataSource.data = proveedores;
    });
  }

  guardarProveedor(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const nuevoProveedor: Proveedor = this.form.value;

    if (this.isEditMode) {
      nuevoProveedor.id = this.currentId;
      this.proveedorService.editarProveedor(nuevoProveedor).subscribe(() => {
        alert('Proveedor editado exitosamente');
        this.cargarProveedores();
        this.resetForm();
      });
    } else {
      this.proveedorService.agregarProveedor(nuevoProveedor).subscribe(() => {
        alert('Proveedor agregado exitosamente');
        this.cargarProveedores();
        this.resetForm();
      });
    }
  }

  eliminarProveedor(id: string): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        titulo: 'Eliminación de proveedor',
        contenido: `¿Estás seguro de eliminar al proveedor con ID ${id}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        this.proveedorService.eliminarProveedor(id).subscribe(() => {
          alert('Proveedor eliminado exitosamente');
          this.cargarProveedores();
        });
      }
    });
  }

  buscarProveedores(): void {
    if (this.buscador.trim() !== '') {
      const proveedoresFiltrados = this.proveedores.filter(proveedor =>
        proveedor.nombre.toLowerCase().includes(this.buscador.toLowerCase()) ||
        proveedor.email.toLowerCase().includes(this.buscador.toLowerCase())
      );
      this.dataSource.data = proveedoresFiltrados;
    } else {
      this.dataSource.data = this.proveedores;
    }
  }

  editarProveedor(proveedor: Proveedor): void {
    this.isEditMode = true;
    this.currentId = proveedor.id;
    this.form.setValue({
      nombre: proveedor.nombre,
      email: proveedor.email,
      telefono: proveedor.telefono,
      direccion: proveedor.direccion,
      rating: proveedor.rating,
      isActive: proveedor.isActive
    });
  }

  resetForm(): void {
    this.form.reset({
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      rating: 0,
      isActive: true
    });
    this.currentId = '';
    this.isEditMode = false;
  }

  handleEdit(proveedor: Proveedor): void {
    this.editarProveedor(proveedor);
  }

  handleDelete(proveedor: Proveedor): void {
    this.eliminarProveedor(proveedor.id);
  }
}
