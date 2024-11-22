import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crud-usuario',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './crud-usuario.component.html',
  styleUrl: './crud-usuario.component.css'
})
export class CrudUsuarioComponent {

  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {
    idUsuario: 0,
    nombreCompleto: '',
    correo: '',
    telefono: '',
    rol: 'cliente',
    estado: true,
    contrasena: undefined
  };
  buscador: string = '';
  usuarioEnEdicion: Usuario | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      console.log('Usuarios:', usuarios);
      this.usuarios = usuarios;
    });
  }
  
  

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  guardarUsuario(): void {
    if (this.usuarioEnEdicion) {
      this.usuarioService.editarUsuario(this.nuevoUsuario).subscribe(() => {
        const index = this.usuarios.findIndex(u => u.idUsuario === this.nuevoUsuario.idUsuario);
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
  
  

  eliminarUsuario(id: number): void {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  resetUsuario(): void {
    this.nuevoUsuario = {
      idUsuario: 0,
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
editarUsuario(usuario: Usuario) {
  this.usuarioEnEdicion = { ...usuario }; 
  this.nuevoUsuario = { ...usuario }; 
}
}

