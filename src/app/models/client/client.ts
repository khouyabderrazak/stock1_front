import {Address} from "../address/address";
import {Currency} from "../currency/currency";
import {Tax} from "../tax/Tax";
import {PaymentCondition} from "../payment-condition/payment-condition";
import { PersonContactsClient } from "../personContactsClient";

export class ClientLite{
  id:number;
  displayName: string;
}

export class Client extends ClientLite{
  title: number;
  firstName: string;
  lastName: string;
  companyName: string;
  type: string;
  email: string | null;
  phonePro: string | null;

  phonePortable: string | null;
  note: string | null;
  deliveryAddressId:number | null
  billingAddressId:number  | null
  billingAddress: Address | null;
  deliveryAddress: Address | null;
  currencyId: number | null;
  taxId: | null
  tax: Tax | null;
  paymentConditionId:number | null
  paymentCondition: PaymentCondition | null;
  associatedDocs: any | null;
  clientContacts:PersonContactsClient[]

  Client(){
    this.id=0;
  }
}
