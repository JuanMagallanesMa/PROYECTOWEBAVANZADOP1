import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product', () => {
    const initialLength = service.getProductos().length;
    service.addProducto({
      id: 3,
      nombre: 'Galletas Temáticas',
      precio: 25,
      categoriaId: 1,
      descuento: 10
    });
    expect(service.getProductos().length).toBe(initialLength + 1);
  });

  it('should delete a product', () => {
    const initialLength = service.getProductos().length;
    service.deleteProducto(1);
    expect(service.getProductos().length).toBe(initialLength - 1);
  });
});
