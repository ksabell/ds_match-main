import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrimaryProfileComponent } from './update-primary-profile.component';

describe('UpdatePrimaryProfileComponent', () => {
  let component: UpdatePrimaryProfileComponent;
  let fixture: ComponentFixture<UpdatePrimaryProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePrimaryProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePrimaryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
