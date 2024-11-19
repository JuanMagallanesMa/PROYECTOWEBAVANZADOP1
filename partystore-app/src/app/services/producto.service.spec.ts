import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Producto } from '../models/Producto';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService]
    });
    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve productos from the JSON file', () => {
    const mockProductos: Producto[] = [
      { id: 1, nombre: 'Globos', categoriaId: 1, precio: 10, descuento: 0 }
    ];

    service.getProductos().subscribe((productos) => {
      expect(productos.length).toBe(1);
      expect(productos).toEqual(mockProductos);
    });

    const req = httpMock.expectOne('assets/json/productos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProductos);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
