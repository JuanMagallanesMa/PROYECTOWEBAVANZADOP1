import { Injectable } from '@angular/core';
import { Categoria } from '../models/Categoria';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoriasjsonService {
  private jsonUrl = '/assets/json/categorias.json';
  constructor(private http: HttpClient) { }
  
  
  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.jsonUrl);
  }

  obtenerCategoriaPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.jsonUrl}/${id}`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.jsonUrl, categoria);
  }

  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.jsonUrl}/${categoria.id}`, categoria);
  }

  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.jsonUrl}/${id}`);
  }
}
