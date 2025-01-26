import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CategoriaModel } from '../interfaces/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

private readonly _api = `http://localhost:5169/api/Categories`;

  constructor(private _http: HttpClient) { }

  obtenerTodos(): Observable<CategoriaModel[]> {
    return this._http
      .get<CategoriaModel[]>(this._api)
      .pipe(
        catchError(() => of([]))
      );
  }

}
