import { TestBed } from '@angular/core/testing';

import { ArcanoService } from './arcano.service';

describe('ArcanoService', () => {
  let service: ArcanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArcanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
