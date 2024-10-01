import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsscreenComponent } from './transactionsscreen.component';

describe('TransactionsscreenComponent', () => {
  let component: TransactionsscreenComponent;
  let fixture: ComponentFixture<TransactionsscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsscreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
