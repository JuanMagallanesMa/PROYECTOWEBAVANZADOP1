import { TestBed } from '@angular/core/testing';

import { PedidosjsonService } from './pedidosjson.service';

describe('PedidosjsonService', () => {
  let service: PedidosjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
