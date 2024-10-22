import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesUploadInputComponent } from './files-upload-input.component';

describe('FilesUploadInputComponent', () => {
  let component: FilesUploadInputComponent;
  let fixture: ComponentFixture<FilesUploadInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesUploadInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilesUploadInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
