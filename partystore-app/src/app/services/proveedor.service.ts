import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Proveedor } from '../models/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = 'http://localhost:3000/proveedores';

  constructor(private http: HttpClient) {}

  obtenerProveedores(): Observable<Proveedor[]> {
    return this.http.get<{ proveedores: Proveedor[] }>(this.apiUrl).pipe(
      map((response: { proveedores: any }) => response.proveedores), // Extraer el array 'proveedores'
      catchError(err => {
        console.error('Error al obtener proveedores:', err);
        return of([]);
      })
    );
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  agregarProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, proveedor).pipe(
      map((newProveedor) => {
        console.log('Proveedor agregado exitosamente:', newProveedor);
        return newProveedor;
      }),
      catchError((err) => {
        console.error('Error al agregar proveedor:', err);
        return of(proveedor);
      })
    );
  }

  editarProveedor(proveedor: Proveedor): Observable<Proveedor> {
    const url = `${this.apiUrl}/${proveedor.id}`;
    return this.http.put<Proveedor>(url, proveedor).pipe(
      map((updatedProveedor) => {
        console.log('Proveedor actualizado exitosamente:', updatedProveedor);
        return updatedProveedor;
      }),
      catchError((err) => {
        console.error('Error al actualizar el proveedor:', err);
        throw err;
      })
    );
  }

  eliminarProveedor(id: string): Observable<string> {
    return of(id).pipe(
      map(deletedId => {
        console.log('Proveedor eliminado con ID:', deletedId);
        return deletedId;
      }),
      catchError(err => {
        console.error('Error al eliminar proveedor:', err);
        return of(id);
      })
    );
  }

  eliminarProveedor1(proveedor: Proveedor): Observable<void> {
    const url = `${this.apiUrl}/${proveedor.id}`;
    return this.http.delete<void>(url).pipe(
      map(() => {
        console.log('Proveedor eliminado con ID:', proveedor.id);
      }),
      catchError(err => {
        console.error('Error al eliminar proveedor:', err);
        throw err;
      })
    );
  }
}
