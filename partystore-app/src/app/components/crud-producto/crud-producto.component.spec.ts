import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudProductoComponent } from './crud-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';

describe('CrudProductoComponent', () => {
  let component: CrudProductoComponent;
  let fixture: ComponentFixture<CrudProductoComponent>;
  let productoService: ProductoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudProductoComponent, ReactiveFormsModule],
      providers: [ProductoService]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudProductoComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from the service', () => {
    const productos = productoService.getProductos();
    expect(productos).toBeGreaterThan(0);
  });
});
