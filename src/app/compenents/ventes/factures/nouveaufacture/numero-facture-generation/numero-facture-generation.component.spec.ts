import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroFactureGenerationComponent } from './numero-facture-generation.component';

describe('NumeroFactureGenerationComponent', () => {
  let component: NumeroFactureGenerationComponent;
  let fixture: ComponentFixture<NumeroFactureGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumeroFactureGenerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumeroFactureGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
