import { TestBed } from '@angular/core/testing';

import { HeaderpedidoApiService } from './headerpedido-api.service';

describe('HeaderpedidoApiService', () => {
  let service: HeaderpedidoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderpedidoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
