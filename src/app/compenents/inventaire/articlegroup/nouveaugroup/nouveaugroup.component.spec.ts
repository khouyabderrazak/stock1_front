import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveaugroupComponent } from './nouveaugroup.component';

describe('NouveaugroupComponent', () => {
  let component: NouveaugroupComponent;
  let fixture: ComponentFixture<NouveaugroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveaugroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouveaugroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
