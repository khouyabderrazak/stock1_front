import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociatedDocsFilesModule } from '../associated-docs-files/associated-docs-files.module';




export interface AssociatedDocsModule {
   id:number
   associatedDocsFile:AssociatedDocsFilesModule[]
 }
