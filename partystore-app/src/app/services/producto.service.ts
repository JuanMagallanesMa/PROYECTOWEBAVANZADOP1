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

  
  getDatos(): Observable<any> {
    return this.http.get<any>('/public/jason/datos.json'); 
  }
}
