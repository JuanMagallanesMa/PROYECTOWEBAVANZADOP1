import { TestBed } from '@angular/core/testing';

import { ProveedorApiService } from './proveedor-api.service';

describe('ProveedorApiService', () => {
  let service: ProveedorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
