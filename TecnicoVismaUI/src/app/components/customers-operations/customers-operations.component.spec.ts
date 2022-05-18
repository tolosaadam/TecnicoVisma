import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersOperationsComponent } from './customers-operations.component';

describe('CustomersOperationsComponent', () => {
  let component: CustomersOperationsComponent;
  let fixture: ComponentFixture<CustomersOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
