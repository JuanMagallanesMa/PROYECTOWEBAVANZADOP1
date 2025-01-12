import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DetailPedido } from '../models/DetailPedido';

@Injectable({
  providedIn: 'root'
})
export class DetailpedidoApiService {
  private apiUrlDetail = 'http://localhost:5169/api/OrderDetails';

  constructor(private http:HttpClient) { }

  getDetailPedido():Observable<DetailPedido[]>{
    return this.http.get<DetailPedido[]>(this.apiUrlDetail); //get para leer
  }
  
  // agregar
  addDetailPedido(Detail:DetailPedido):Observable<DetailPedido>{
    return this.http.post<DetailPedido>(this.apiUrlDetail, Detail); // post para agregar algo nuevo
  }

  // editar
  updateDetailPedido(Detail:DetailPedido):Observable<DetailPedido>{
    const urlDelDetail =`${this.apiUrlDetail}/${Detail.id}`; 
    return this.http.put<DetailPedido>(urlDelDetail, Detail); //put  para editar
  }

  //eliminar
  deleteDetailPedido(Detail:DetailPedido):Observable<void>{
    const urlDelDetail =`${this.apiUrlDetail}/${Detail.id}`; 
    return this.http.delete<void>(urlDelDetail); // delete para eliminar
  }

  // eliminar logicamente
  desactiveDetailPedido(Detail:DetailPedido):Observable<DetailPedido>{
    const urlDelDetail =`${this.apiUrlDetail}/desactive/${Detail.id}`; 
    return this.http.put<DetailPedido>(urlDelDetail, Detail); //put  para editar
  }
}
