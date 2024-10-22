import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressModule } from '../address/address.module';
import { CurrencyModule } from '../currency/currency.module';
import { Tax } from '../Tax';
import { PaymentConditionModule } from '../payment-condition/payment-condition.module';
import { PersonContactsSupplierModule } from '../person-contacts-supplier/person-contacts-supplier.module';



export interface SupplierModule {

    supplierContacts?:PersonContactsSupplierModule[]
    id: number
    title: number
    firstName: string
    lastName: string
    companyName: string
    type: number
    displayName: string
    email?: string
    phonePro: string
    phonePortable: string
    note?: string
    billingAddress?: AddressModule
    deliveryAddress?: AddressModule
    currency?: CurrencyModule
    tax?: Tax
    paymentCondition?: PaymentConditionModule
    associatedDocs?: string
 }
