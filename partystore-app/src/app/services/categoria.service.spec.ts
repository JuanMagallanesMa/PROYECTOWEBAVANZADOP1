import { TestBed } from '@angular/core/testing';
import { CategoriaService } from './categoria.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Categoria } from '../models/Categoria';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriaService]
    });
    service = TestBed.inject(CategoriaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve categorias from the JSON file', () => {
    const mockCategorias: Categoria[] = [
      { id: 1, nombre: 'Decoración', descuento: 10 },
      { id: 2, nombre: 'Comida', descuento: 5 }
    ];

    service.getCategorias().subscribe((categorias) => {
      expect(categorias.length).toBe(2);
      expect(categorias).toEqual(mockCategorias);
    });

    const req = httpMock.expectOne('assets/json/categorias.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategorias);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
