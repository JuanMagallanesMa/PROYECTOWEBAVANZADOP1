import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Proveedor } from '../models/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorApiService {
  private apiUrlProveedor = 'http://localhost:5169/api/Proveedores';

  constructor(private http: HttpClient) {}

  // Obtener todos los proveedores
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrlProveedor); // GET para leer
  }

  // Buscar proveedores
  getProveedorSearch(
    nombre?: string,
    idProveedor?: string,
    email?: string
  ): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrlProveedor).pipe(
      map((proveedores) =>
        proveedores.filter((proveedor) =>
          (nombre ? proveedor.nombre.toLowerCase().includes(nombre.toLowerCase()) : true) &&
          (idProveedor ? proveedor.id === idProveedor : true) &&
          (email ? proveedor.email.toLowerCase().includes(email.toLowerCase()) : true)
        )
      )
    );
  }

  // Agregar proveedor
  addProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrlProveedor, proveedor); // POST para agregar
  }

  // Editar proveedor
  updateProveedor(proveedor: Proveedor): Observable<Proveedor> {
    const urlDelProveedor = `${this.apiUrlProveedor}/${proveedor.id}`;
    return this.http.put<Proveedor>(urlDelProveedor, proveedor); // PUT para editar
  }

  // Eliminar proveedor
  deleteProveedor(proveedor: Proveedor): Observable<void> {
    const urlDelProveedor = `${this.apiUrlProveedor}/${proveedor.id}`;
    return this.http.delete<void>(urlDelProveedor); // DELETE para eliminar
  }

  // Desactivar proveedor 
  desactiveProveedor(proveedor: Proveedor): Observable<Proveedor> {
    const urlDelProveedor = `${this.apiUrlProveedor}/desactive/${proveedor.id}`;
    return this.http.put<Proveedor>(urlDelProveedor, proveedor); // PUT para desactivar
  }
}

