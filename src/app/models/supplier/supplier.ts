import {PersonContactsSupplier} from "../person-contacts-supplier/person-contacts-supplier";
import {Address} from "../address/address";
import {Currency} from "../currency/currency";
import {PaymentCondition} from "../payment-condition/payment-condition";
import {Tax} from "../tax/Tax";

export interface Supplier {
    supplierContacts?:PersonContactsSupplier[]
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
    billingAddress?: Address
    deliveryAddress?: Address
    currency?: Currency
    tax?: Tax
    paymentCondition?: PaymentCondition
    associatedDocs?: string
 }
