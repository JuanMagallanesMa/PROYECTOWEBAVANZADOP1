import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderPedido } from '../models/HeaderPedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosjsonService {
  private jsonUrlHeader = 'http://localhost:3000/headerPedido';

  constructor(private http: HttpClient) {}
  getHeaderPedido(): Observable<HeaderPedido[]> {
    return this.http.get<HeaderPedido[]>(this.jsonUrlHeader);
  }
}
