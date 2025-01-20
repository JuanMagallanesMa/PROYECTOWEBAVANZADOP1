import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/Categoria';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoriaApiService {


  private apiURL = 'http://localhost:5169/api/Categories'; // URL del API backend

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiURL);
  }
  
  // Buscar categorías por nombre o descripción
  buscarCategorias(
    termino: string = '',
    edadesAplicables?: string,
    tiposEvento?: string,
    estado?: string
  ): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiURL).pipe(
      map((categorias) =>
        categorias.filter((categoria) => {
          const coincideNombre = termino
            ? categoria.nombre.toLowerCase().includes(termino.toLowerCase()) ||
              categoria.descripcion.toLowerCase().includes(termino.toLowerCase())
            : true;
  
          const coincideEdad = edadesAplicables
            ? categoria.edadesAplicables.includes(edadesAplicables)
            : true;
  
          const coincideTipo = tiposEvento
            ? categoria.tiposEvento.includes(tiposEvento)
            : true;
  
          const coincideEstado = estado ? categoria.estado === estado : true;
  
          return coincideNombre && coincideEdad && coincideTipo && coincideEstado;
        })
      )
    );
  }
  
  // Crear una nueva categoría
  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiURL, categoria);
  }
  
  // Actualizar una categoría existente
  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    const urlCategoria = `${this.apiURL}/${categoria.id}`; // URL: http://localhost:5000/api/categories/id
    return this.http.put<Categoria>(urlCategoria, categoria);
  }

  // Eliminar una categoría
  eliminarCategoria(id: number): Observable<void> {
    const urlCategoria = `${this.apiURL}/${id}`; // URL: http://localhost:5000/api/categories/id
    return this.http.delete<void>(urlCategoria);
  }
}