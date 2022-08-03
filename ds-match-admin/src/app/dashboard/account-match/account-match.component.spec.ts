import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMatchComponent } from './account-match.component';

describe('AccountMatchComponent', () => {
  let component: AccountMatchComponent;
  let fixture: ComponentFixture<AccountMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
