import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../shared/table/table.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crud-usuario',
  standalone: true,
  imports: [FormsModule, RouterModule, TableComponent, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule],
  templateUrl: './crud-usuario.component.html',
  styleUrl: './crud-usuario.component.css'
})
export class CrudUsuarioComponent {

  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {
    id: 0,
    nombreCompleto: '',
    correo: '',
    telefono: '',
    rol: 'cliente',
    estado: true,
    contrasena: undefined,
  };
  buscador: string = '';
  usuarioEnEdicion: Usuario | null = null;

  constructor(private usuarioService: UsuarioService) {}
  dataSource = new MatTableDataSource<Usuario>();
  
  //definir las columnas
  displayedColumns: string[] = ['nombreCompleto', 'correo', 'telefono', 'acciones'];  
  columnAliases = { nombreCompleto: 'Nombre Completo', correo: 'Correo Electrónico', telefono: 'Teléfono', acciones:'Acciones' }; 


  ngOnInit() {
    this.cargarUsuarios();
  }
  
  

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.dataSource.data = usuarios; 
    });
  }

  guardarUsuario(): void {
    if (this.usuarioEnEdicion) {
      this.usuarioService.editarUsuario(this.nuevoUsuario).subscribe(() => {
        const index = this.usuarios.findIndex(u => u.id === this.nuevoUsuario.id);
        if (index > -1) {
          this.usuarios[index] = { ...this.nuevoUsuario };
        }
        this.usuarioEnEdicion = null;
        this.resetUsuario();
      });
    } else {
      this.usuarioService.agregarUsuario(this.nuevoUsuario).subscribe(nuevoUsuario => {
        this.usuarios.push(nuevoUsuario);
        this.resetUsuario();
      });
    }
  }
  
  guardarUsuario1(): void {
    if (this.usuarioEnEdicion) {
      this.usuarioService.editarUsuario(this.nuevoUsuario).subscribe(() => {
        const index = this.dataSource.data.findIndex(u => u.id === this.nuevoUsuario.id);
        if (index > -1) {
          this.dataSource.data[index] = { ...this.nuevoUsuario };
          this.dataSource.data = [...this.dataSource.data]; // Actualizar el dataSource
        }
        this.usuarioEnEdicion = null;
        this.resetUsuario();
      });
    } else {
      this.usuarioService.agregarUsuario(this.nuevoUsuario).subscribe(nuevoUsuario => {
        this.dataSource.data = [...this.dataSource.data, nuevoUsuario]; // Agregar nuevo usuario al dataSource
        this.resetUsuario();
      });
    }
  }
  

  eliminarUsuario(id: Usuario): void {
    this.usuarioService.eliminarUsuario1(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  resetUsuario(): void {
    this.nuevoUsuario = {
      id: 0,
      nombreCompleto: '',
      correo: '',
      contrasena: '',
      telefono: '',
      rol: 'cliente',
      estado: true,
    };
  }
   // Buscar usuarios
buscarUsuarios() {
  if (this.buscador.trim() !== '') {
    this.usuarios = this.usuarios.filter(usuario =>
      usuario.nombreCompleto.toLowerCase().includes(this.buscador.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(this.buscador.toLowerCase())
    );
  } else{
    this.resetUsuario();
  }
}
buscarUsuarios1(): void {
  if (this.buscador.trim() !== '') {
    const usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombreCompleto.toLowerCase().includes(this.buscador.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(this.buscador.toLowerCase())
    );
    this.dataSource.data = usuariosFiltrados; // Actualizar el dataSource con los usuarios filtrados
  } else {
    this.resetUsuario();
    this.dataSource.data = this.usuarios; // Restaurar el dataSource con todos los usuarios
  }
}


editarUsuario(usuario: Usuario) {
  this.usuarioEnEdicion = { ...usuario }; 
  this.nuevoUsuario = { ...usuario }; 
}
handleEdit(usuario: Usuario) { 
  this.editarUsuario(usuario);
  console.log('Editar usuario:', usuario); 
} 

handleDelete(usuario: Usuario) { 
  this.eliminarUsuario(usuario);
  console.log('Eliminar usuario:', usuario.id);
}
}

