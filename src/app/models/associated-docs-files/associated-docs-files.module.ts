import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociatedDocsModule } from '../associated-docs/associated-docs.module';




export interface AssociatedDocsFilesModule {
  id:number
  filePath:string 
  associatedDocs?:AssociatedDocsModule
 }
