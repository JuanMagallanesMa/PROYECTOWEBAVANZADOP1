import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.css'],
  imports: [MatSortModule,MatPaginatorModule, MatIconModule, MatInputModule, MatButtonModule, 
    MatTableModule, FormsModule, MatSelectModule, MatFormFieldModule, CommonModule ]
})
export class UsuariosComponent implements OnInit {
cancelarEdicion() {
throw new Error('Method not implemented.');
}
usuarioSeleccionado: any;
guardarUsuario() {
throw new Error('Method not implemented.');
}
form!:FormGroup;
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  searchTerm: string = '';
  displayedColumns: string[] = ['nombreCompleto', 'correo', 'telefono', 'rol', 'acciones'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.filteredUsuarios = data;
    });
  }

  applyFilter(): void {
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.nombreCompleto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editarUsuario(usuario: Usuario): void {
    console.log('Editar usuario:', usuario);
  }

  eliminarUsuario(id: number): void {
    console.log('Eliminar usuario con ID:', id);
  }

  editarusuario(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario };
  }
  
  guardarusuario(): void {
    const index = this.usuarios.findIndex((u) => u.idUsuario === this.usuarioSeleccionado.id);
    if (index !== -1) {
      this.usuarios[index] = this.usuarioSeleccionado; 
      this.usuarioSeleccionado = null; 
      this.applyFilter(); 
    }
  }
  
  cancelaredicion(): void {
    this.usuarioSeleccionado = null;
  }
  
  saveUser() {
    if (!this.usuarioSeleccionado.id) {
    
      this.usuarioSeleccionado.id = this.usuarios.length + 1;
      this.usuarios.push({ ...this.usuarioSeleccionado }); 
      alert('Usuario creado con éxito');
    } else {
      
      const index = this.usuarios.findIndex(user => user.idUsuario === this.usuarioSeleccionado.id);
      if (index !== -1) {
        this.usuarios[index] = { ...this.usuarioSeleccionado }; 
        alert('Usuario actualizado con éxito');
      }
    }
  
    
    this.usuarioSeleccionado = { id: 0, nombre: '', correo: '', rol: '' }; 
    this.saveToJSON(); 
  }
  saveToJSON() {
    throw new Error('Method not implemented.');
  }
  

}
