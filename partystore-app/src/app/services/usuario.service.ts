import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  [x: string]: any;

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<{ usuarios: Usuario[] }>(this.apiUrl).pipe(
      map((response: { usuarios: any; }) => response.usuarios), // Extract the 'usuarios' array
      catchError(err => {
        console.error('Error al obtener usuarios:', err);
        return of([]);
      })
    );
  }
  

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return of(usuario).pipe(
      map(newUser => {
        console.log('Usuario agregado:', newUser);
        return newUser;
      }),
      catchError(err => {
        console.error('Error al agregar usuario:', err);
        return of(usuario);
      })
    );
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return of(usuario).pipe(
      map(updatedUser => {
        console.log('Usuario actualizado:', updatedUser);
        return updatedUser;
      }),
      catchError(err => {
        console.error('Error al editar usuario:', err);
        return of(usuario);
      })
    );
  }

 
  eliminarUsuario(id: number): Observable<number> {
    return of(id).pipe(
      map(deletedId => {
        console.log('Usuario eliminado con ID:', deletedId);
        return deletedId;
      }),
      catchError(err => {
        console.error('Error al eliminar usuario:', err);
        return of(id);
      })
    );
  }
}

