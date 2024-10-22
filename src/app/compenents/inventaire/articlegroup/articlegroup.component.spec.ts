import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlegroupComponent } from './articlegroup.component';

describe('ArticlegroupComponent', () => {
  let component: ArticlegroupComponent;
  let fixture: ComponentFixture<ArticlegroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlegroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticlegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
