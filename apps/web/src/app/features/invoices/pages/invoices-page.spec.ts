import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesPage } from './invoices-page';

describe('InvoicesPage', () => {
  let component: InvoicesPage;
  let fixture: ComponentFixture<InvoicesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
