import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {
private apiUrlUsuario = 'http://localhost:5169/api/Users';

  constructor(private http:HttpClient) { }

  getUsuario():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrlUsuario); //get para leer
  }
  //buscar
  getUsuarioSearch(nombre?:string, idUsuario?:number, email?:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrlUsuario).pipe(
      map((Usuarios)=>
        Usuarios.filter((Usuario)=>
        (nombre ? Usuario.name.toLowerCase().includes(nombre.toLowerCase()):true) &&
        (idUsuario ? Usuario.id===idUsuario:true)&&
        (email ? Usuario.email.toLowerCase().includes(email.toLowerCase()):true)
        )
      )
    );
  }

  // agregar
  addUsuario(Usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.apiUrlUsuario, Usuario); // post para agregar algo nuevo
  }

  // editar
  updateUsuario(Usuario:Usuario):Observable<Usuario>{
    const urlDelUsuario =`${this.apiUrlUsuario}/${Usuario.id}`; 
    return this.http.put<Usuario>(urlDelUsuario, Usuario); //put  para editar
  }

  //eliminar
  deleteUsuario(Usuario:Usuario):Observable<void>{
    const urlDelUsuario =`${this.apiUrlUsuario}/${Usuario.id}`; 
    return this.http.delete<void>(urlDelUsuario); // delete para eliminar
  }

  // eliminar logicamente
  desactiveUsuario(Usuario:Usuario):Observable<Usuario>{
    const urlDelUsuario =`${this.apiUrlUsuario}/desactive/${Usuario.id}`; 
    return this.http.put<Usuario>(urlDelUsuario, Usuario); //put  para editar
  }
}
