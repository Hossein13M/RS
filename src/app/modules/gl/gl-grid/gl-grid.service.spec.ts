import { TestBed } from '@angular/core/testing';

import { GlGridService } from './gl-grid.service';

describe('GlGridService', () => {
  let service: GlGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
