import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  getProductos() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  // Método para cargar los datos desde el archivo JSON
  getDatos(): Observable<any> {
    return this.http.get<any>('/assets/datos.json'); // Asegúrate de que el archivo JSON esté en la carpeta 'assets'
  }
}
