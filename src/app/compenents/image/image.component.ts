import { Component, Input, OnInit, inject } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css',
  providers:[HttpClient,UploadFileService]
})
export class ImageComponent implements OnInit {


  @Input() fileName: string;
  @Input() width:any;
  @Input() height:any; 

  
  constructor(private fileService:UploadFileService){

  }

  imageToShow: any; // Data URL for the image

  ngOnInit(): void {
    this.get_image();
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  get_image(): void {
    this.fileService.DownLoadFile(this.fileName).subscribe((data: Blob) => {
      this.createImageFromBlob(data);
    });
  }

}




