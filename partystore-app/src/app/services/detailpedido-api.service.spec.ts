import { TestBed } from '@angular/core/testing';

import { DetailpedidoApiService } from './detailpedido-api.service';

describe('DetailpedidoApiService', () => {
  let service: DetailpedidoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailpedidoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
