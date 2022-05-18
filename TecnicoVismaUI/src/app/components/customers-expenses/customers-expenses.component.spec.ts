import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersExpensesComponent } from './customers-expenses.component';

describe('CustomersExpensesComponent', () => {
  let component: CustomersExpensesComponent;
  let fixture: ComponentFixture<CustomersExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
