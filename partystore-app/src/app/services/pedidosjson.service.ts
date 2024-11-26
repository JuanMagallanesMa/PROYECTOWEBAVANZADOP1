import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderPedido } from '../models/HeaderPedido';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PedidosjsonService {
  
  private jsonUrlHeader = 'http://localhost:3000/headerPedido';

  constructor(private http: HttpClient) {}
  getHeaderPedido(): Observable<HeaderPedido[]> {
    return this.http.get<HeaderPedido[]>(this.jsonUrlHeader);
  }
  addHeaderPedido(headerPedido: HeaderPedido) : Observable<HeaderPedido>{
    return this.http.post<HeaderPedido>(this.jsonUrlHeader, headerPedido);
  }
 //getIdProducto():number{
  //  const idObtenido= 
 //   return 0;
 // }
 
  private productosSeleccionados = new BehaviorSubject<any[]>([]); 
  productosSeleccionados$ = this.productosSeleccionados.asObservable(); 
  agregarProductoCart(producto: any) {
      const productosActuales = this.productosSeleccionados.value; 
      this.productosSeleccionados.next([...productosActuales, producto]); 
    } 
  obtenerProductosCart() {
      return this.productosSeleccionados$;
  }
  eliminarPedido(id: HeaderPedido): Observable<void> {
    return this.http.delete<void>(`${this.jsonUrlHeader}/${id.id}`);
  }


}
