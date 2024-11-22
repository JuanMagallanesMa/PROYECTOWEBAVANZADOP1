import { TestBed } from '@angular/core/testing';

import { CategoriajsonService } from './categoriajson.service';

describe('CategoriajsonService', () => {
  let service: CategoriajsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriajsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
