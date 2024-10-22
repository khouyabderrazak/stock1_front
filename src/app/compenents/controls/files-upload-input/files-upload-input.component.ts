import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faFile, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ButtonModule} from "primeng/button";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf} from "@angular/common";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'files-upload-input',
  standalone: true,
  imports: [
    ButtonModule,
    FaIconComponent,
    NgForOf,
    NgIf,
    OverlayPanelModule,
    TooltipModule
  ],
  templateUrl: './files-upload-input.component.html',
  styleUrl: './files-upload-input.component.css'
})
export class FilesUploadInputComponent {

    protected readonly faFile = faFile;
    protected readonly faTrash = faTrash;

    @Output() onFilesSelected:EventEmitter<File[]>=new EventEmitter<File[]>();
    @Input() associatedDocs: File[] = [];
    downloadFile(file: File) {
      const blob = new Blob([file], { type: file.type });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
    addFiles(event:any){
      const input = event.target as HTMLInputElement;
      const files :File[] = Array.from(input.files);
      if (files) {
        console.log('Files selected:', files);
        this.associatedDocs = this.associatedDocs?.concat(files);
      }
      this.emitAction();
    }
    deleteSelectedFileFile(index:number){
      if(index>=0 && this.associatedDocs.length > 0 && this.associatedDocs.length>index){
        this.associatedDocs.splice(index,1);
      }
      this.emitAction();
    }
    emitAction(){
      this.onFilesSelected.emit(this.associatedDocs);
    }
}
