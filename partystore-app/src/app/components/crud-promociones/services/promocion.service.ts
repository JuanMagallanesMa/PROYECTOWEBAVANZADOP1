import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PromocioneModel } from '../interfaces/promocion-model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  private readonly _api = `http://localhost:5169/api/Promociones`;

  constructor(private _http: HttpClient) { }

  crear(body: PromocioneModel): Observable<boolean> {
    return this._http
      .post<PromocioneModel>(this._api, body)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  actualizar(body: PromocioneModel): Observable<boolean> {
    return this._http
      .put<PromocioneModel>(`${this._api}/${body.id}`, body)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  eliminar(id: number): Observable<boolean> {
    return this._http
      .delete(`${this._api}/${id}`)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  obtenerTodos(): Observable<PromocioneModel[]> {
    return this._http
      .get<PromocioneModel[]>(this._api)
      .pipe(
        catchError(() => of([]))
      );
  }

}
