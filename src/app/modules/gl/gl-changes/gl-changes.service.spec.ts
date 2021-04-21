import { TestBed } from '@angular/core/testing';

import { GlChangesService } from './gl-changes.service';

describe('GlChangesService', () => {
  let service: GlChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
