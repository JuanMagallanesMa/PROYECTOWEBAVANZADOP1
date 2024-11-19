import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudProductoComponent } from './crud-producto.component';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

describe('CrudProductoComponent', () => {
  let component: CrudProductoComponent;
  let fixture: ComponentFixture<CrudProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudProductoComponent, MatTableModule, MatSelectModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a product', () => {
    const initialLength = component.productos.length;
    component.nombreProducto = 'Nuevo Producto';
    component.precioProducto = 30;
    component.crearProducto();
    expect(component.productos.length).toBe(initialLength + 1);
  });

  it('should delete a product', () => {
    const initialLength = component.productos.length;
    component.eliminarProducto(component.productos[0]);
    expect(component.productos.length).toBe(initialLength - 1);
  });
});
