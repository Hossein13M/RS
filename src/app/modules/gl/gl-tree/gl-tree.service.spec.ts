import { TestBed } from '@angular/core/testing';
import { GlTreeService } from './gl-tree.service';

describe('GlTreeService', () => {
    let service: GlTreeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GlTreeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
