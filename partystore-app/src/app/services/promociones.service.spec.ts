import { TestBed } from '@angular/core/testing';

import { PromocionesService } from './promociones.service';

describe('PromocionesService', () => {
  let service: PromocionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromocionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});export interface Promociones {
    id: number;
    nombre: string;
    descripcion: string;
    id_categoria?: string;
    id_producto?: number;
    descuentoPorcentaje: number;
    fechaFin: Date;
    isActive: boolean;
}

