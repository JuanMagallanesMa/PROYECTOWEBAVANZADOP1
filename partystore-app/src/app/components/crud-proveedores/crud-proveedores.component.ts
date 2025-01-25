import { Component } from '@angular/core';
import { Proveedor } from '../../models/Proveedor';
import { ProveedorService } from '../../services/proveedor.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../shared/table/table.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crud-proveedores',
  standalone: true,
  imports: [FormsModule, RouterModule, TableComponent, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule],
  templateUrl: './crud-proveedores.component.html',
  styleUrl: './crud-proveedores.component.css'
})
export class CrudProveedoresComponent {
  proveedores: Proveedor[] = [];
  nuevoProveedor: Proveedor = {
    id: '',
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    rating: 0,
    isActive: true,
  };
  buscador: string = '';
  proveedorEnEdicion: Proveedor | null = null;

  constructor(private proveedorService: ProveedorService, private http: HttpClient) {}
  dataSource = new MatTableDataSource<Proveedor>();
  
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'direccion', 'acciones'];
  columnAliases = { nombre: 'Nombre', email: 'Correo', telefono: 'Teléfono', direccion: 'Dirección', acciones: 'Acciones' };

  ngOnInit() {
    this.cargarProveedores();
  }
  
  cargarProveedores(): void {
    this.proveedorService.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
      this.dataSource.data = proveedores;
    });
  }

  guardarProveedor(): void {
    if (this.proveedorEnEdicion) {
      this.proveedorService.editarProveedor(this.nuevoProveedor).subscribe(() => {
        const index = this.dataSource.data.findIndex(p => p.id === this.nuevoProveedor.id);
        if (index > -1) {
          this.dataSource.data[index] = { ...this.nuevoProveedor };
          this.dataSource.data = [...this.dataSource.data];
        }
        this.proveedorEnEdicion = null;
        this.resetProveedor();
      });
    } else {
      this.proveedorService.agregarProveedor(this.nuevoProveedor).subscribe(nuevoProveedor => {
        this.dataSource.data = [...this.dataSource.data, nuevoProveedor];
        this.resetProveedor();
      });
    }
  }

  eliminarProveedor(id: string): void {
    this.proveedorService.eliminarProveedor(id).subscribe(() => {
      this.cargarProveedores();
    });
  }

  resetProveedor(): void {
    this.nuevoProveedor = {
      id: '',
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      rating: 0,
      isActive: true,
    };
  }

  buscarProveedores(): void {
    if (this.buscador.trim() !== '') {
      const proveedoresFiltrados = this.proveedores.filter(proveedor =>
        proveedor.nombre.toLowerCase().includes(this.buscador.toLowerCase()) ||
        proveedor.email.toLowerCase().includes(this.buscador.toLowerCase())
      );
      this.dataSource.data = proveedoresFiltrados;
    } else {
      this.resetProveedor();
      this.dataSource.data = this.proveedores;
    }
  }

  editarProveedor(proveedor: Proveedor): void {
    this.proveedorEnEdicion = { ...proveedor };
    this.nuevoProveedor = { ...proveedor };
  }

  handleEdit(proveedor: Proveedor): void {
    this.editarProveedor(proveedor);
    console.log('Editar proveedor:', proveedor);
  }

  handleDelete(proveedor: Proveedor): void {
    this.eliminarProveedor(proveedor.id);
    console.log('Eliminar proveedor:', proveedor.id);
  }
}
