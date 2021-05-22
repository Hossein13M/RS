import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliancesFundAddComponent } from './compliances-fund-add.component';

describe('CompliancesFundAddComponent', () => {
  let component: CompliancesFundAddComponent;
  let fixture: ComponentFixture<CompliancesFundAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompliancesFundAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliancesFundAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
