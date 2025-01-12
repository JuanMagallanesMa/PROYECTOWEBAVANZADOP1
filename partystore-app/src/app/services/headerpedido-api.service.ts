import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderPedido } from '../models/HeaderPedido';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderpedidoApiService {
  private apiUrlHeader = 'http://localhost:5169/api/Orders';

  constructor(private http:HttpClient) { }

  getHeaderPedido():Observable<HeaderPedido[]>{
    return this.http.get<HeaderPedido[]>(this.apiUrlHeader); //get para leer
  }
  //buscar
  getHeaderPedidoSearch(usuario?:string, idPedido?:number):Observable<HeaderPedido[]>{
    return this.http.get<HeaderPedido[]>(this.apiUrlHeader).pipe(
      map((headers)=>
        headers.filter((header)=>
        (usuario ? header.name.toLowerCase().includes(usuario.toLowerCase()):true) &&
        (idPedido ? header.id===idPedido:true)
        )
      )
    );
  }

  // agregar
  addHeaderPedido(header:HeaderPedido):Observable<HeaderPedido>{
    return this.http.post<HeaderPedido>(this.apiUrlHeader, header); // post para agregar algo nuevo
  }

  // editar
  updateHeaderPedido(header:HeaderPedido):Observable<HeaderPedido>{
    const urlDelHeader =`${this.apiUrlHeader}/${header.id}`; 
    return this.http.put<HeaderPedido>(urlDelHeader, header); //put  para editar
  }

  //eliminar
  deleteHeaderPedido(header:HeaderPedido):Observable<void>{
    const urlDelHeader =`${this.apiUrlHeader}/${header.id}`; 
    return this.http.delete<void>(urlDelHeader); // delete para eliminar
  }

  // eliminar logicamente
  desactiveHeaderPedido(header:HeaderPedido):Observable<HeaderPedido>{
    const urlDelHeader =`${this.apiUrlHeader}/desactive/${header.id}`; 
    return this.http.put<HeaderPedido>(urlDelHeader, header); //put  para editar
  }




}
