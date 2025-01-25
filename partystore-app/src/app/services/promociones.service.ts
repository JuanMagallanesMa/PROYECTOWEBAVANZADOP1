import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promociones } from "./promociones.service.spec";
@Injectable({
  providedIn: 'root'
})
export class PromocionesService {
  private baseUrl = 'http://localhost:5169/api/Promociones'; // URL del API

  constructor(private http: HttpClient) { }

  getPromociones(): Observable<Promociones[]> {
    return this.http.get<Promociones[]>(`${this.baseUrl}`);
  }

  crearPromocion(promocion: Promociones): Observable<Promociones> {
    return this.http.post<Promociones>(this.baseUrl, promocion);
  }

  actualizarPromocion(id: number, promocion: Promociones): Observable<Promociones> {
    return this.http.put<Promociones>(`${this.baseUrl}/${id}`, promocion);
  }

  eliminarPromocion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
