import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcarddetailsscreenComponent } from './creditcarddetailsscreen.component';

describe('CreditcarddetailsscreenComponent', () => {
  let component: CreditcarddetailsscreenComponent;
  let fixture: ComponentFixture<CreditcarddetailsscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditcarddetailsscreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcarddetailsscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
