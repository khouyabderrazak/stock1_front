import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {TableModule} from 'primeng/table'
import {CarouselModule} from 'primeng/carousel'
import {GalleriaModule} from 'primeng/galleria'
import {OrderListModule} from 'primeng/orderlist'
import {ImageModule} from 'primeng/image'
import {ButtonModule} from 'primeng/button'

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule,TableModule,CarouselModule,GalleriaModule,OrderListModule,ImageModule,ButtonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent implements OnInit {
    
    public message:string;  
    
    public progress:number;
    
    public img:any=null;
    
    public src:any
    
    @Output() public OnChooseFile=new EventEmitter();
    
    ngOnInit(){
   
    }


    public uploadFile=(files:any,file:HTMLInputElement)=>{
        this.img=files[0];
        this.src=URL.createObjectURL(this.img);
        this.OnChooseFile.emit(files[0]);     
        file.style.display='none';
    }

    delete(file:HTMLInputElement){
         this.img=null;
         file.style.display='block'
         this.OnChooseFile.emit(null);  
    }
}
