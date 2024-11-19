import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'assets/json/categorias.json';  // Ruta del archivo JSON local

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  // Crear una nueva categoría (simulada)
  createCategoria(categoria: Categoria): Observable<Categoria> {
    // Lógica para agregar la categoría al JSON (simulada)
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  // Actualizar una categoría (simulada)
  updateCategoria(id: number, categoria: Categoria): Observable<Categoria> {
    // Lógica para actualizar la categoría en el JSON (simulada)
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  // Eliminar una categoría (simulada)
  deleteCategoria(id: number): Observable<void> {
    // Lógica para eliminar la categoría del JSON (simulada)
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
