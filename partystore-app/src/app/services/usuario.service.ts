import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return new Observable((observer) => {
      observer.next(usuario);
      observer.complete();
    });
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return new Observable((observer) => {
      observer.next(usuario);
      observer.complete();
    });
  }

  deleteUsuario(id: number): Observable<void> {
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }
}

