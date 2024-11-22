import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudProductoComponent } from './crud-producto.component';
import { ProductoService } from '../../services/producto.service';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CrudProductoComponent', () => {
  let component: CrudProductoComponent;
  let fixture: ComponentFixture<CrudProductoComponent>;
  let productoService: ProductoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudProductoComponent ],
      imports: [ HttpClientTestingModule, FormsModule, ReactiveFormsModule ],
      providers: [ ProductoService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProductoComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar productos al iniciar', () => {
    const productosMock = [
      { id: 1, nombre: 'Producto 1', categoria: 'Categoría 1', precio: 100, descripcion: 'Descripción 1' },
      { id: 2, nombre: 'Producto 2', categoria: 'Categoría 2', precio: 200, descripcion: 'Descripción 2' }
    ];
    spyOn(productoService, 'obtenerProductos').and.returnValue(of(productosMock));
    component.ngOnInit();
    expect(component.productos.length).toBe(2);
  });

  it('debe crear un nuevo producto', () => {
    const productoNuevo = { id: 3, nombre: 'Producto 3', categoria: 'Categoría 3', precio: 300, descripcion: 'Descripción 3' };
    spyOn(productoService, 'crearProducto').and.returnValue(of(productoNuevo));
    component.crearProducto();
    expect(component.productos.length).toBe(1);  
  });

  it('debe eliminar un producto', () => {
    const productosMock = [
      { id: 1, nombre: 'Producto 1', categoria: 'Categoría 1', precio: 100, descripcion: 'Descripción 1' }
    ];
    component.productos = productosMock;
    spyOn(productoService, 'eliminarProducto').and.returnValue(of(undefined));
    component.eliminarProducto(1);
    expect(component.productos.length).toBe(0);  
  });
});
