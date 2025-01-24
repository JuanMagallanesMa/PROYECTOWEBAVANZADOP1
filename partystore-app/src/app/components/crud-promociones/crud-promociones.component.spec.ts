import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudPromocionesComponent } from './crud-promociones.component';

describe('CrudPromocionesComponent', () => {
  let component: CrudPromocionesComponent;
  let fixture: ComponentFixture<CrudPromocionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPromocionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
