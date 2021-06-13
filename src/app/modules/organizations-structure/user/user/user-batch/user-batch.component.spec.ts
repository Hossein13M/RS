import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBatchComponent } from './user-batch.component';

describe('UserBatchComponent', () => {
  let component: UserBatchComponent;
  let fixture: ComponentFixture<UserBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
