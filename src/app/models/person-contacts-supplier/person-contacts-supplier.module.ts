import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonToContactModule } from '../person-to-contact/person-to-contact.module';
import { SupplierModule } from '../supplier/supplier.module';




export interface PersonContactsSupplierModule {  
 id:number  
 personToContact:PersonToContactModule
 supplier:SupplierModule
 }
