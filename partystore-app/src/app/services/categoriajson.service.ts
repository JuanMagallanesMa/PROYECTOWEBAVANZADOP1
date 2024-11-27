import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../models/Categoria';


@Injectable({
  providedIn: 'root',
})
export class CategoriajsonService {
  private jsonURL = 'http://localhost:3000/categoria'; // URL del servidor JSON

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.jsonURL).pipe(
      map((categorias) =>
        categorias.map((categoria) => ({
          ...categoria,
          id: Number(categoria.id), // Asegura que el ID sea un número
        }))
      )
    );
  }
  
  // Buscar categorías por nombre o descripción
  buscarCategorias(
    termino: string = '',
    edadesAplicables?: string,
    tiposEvento?: string,
    estado?: string
  ): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.jsonURL).pipe(
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
    const nuevaCategoria = {
      ...categoria,
      id: parseInt(categoria.id as unknown as string, 10), // Convierte el ID a entero si es necesario
    };
    return this.http.post<Categoria>(this.jsonURL, nuevaCategoria);
  }
  

  // Actualizar una categoría existente
  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    const urlCategoria = `${this.jsonURL}/${categoria.id}`; // URL: http://localhost:3000/categoria/id
    return this.http.put<Categoria>(urlCategoria, categoria);
  }

  // Eliminar una categoría
  eliminarCategoria(id: number): Observable<void> {
    const urlCategoria = `${this.jsonURL}/${id}`; // URL: http://localhost:3000/categoria/id
    return this.http.delete<void>(urlCategoria);
  }
  
}
