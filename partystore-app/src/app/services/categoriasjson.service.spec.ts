import { TestBed } from '@angular/core/testing';

import { CategoriasjsonService } from './categoriasjson.service';

describe('CategoriasjsonService', () => {
  let service: CategoriasjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
