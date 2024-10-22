import {PersonToContact} from "../person-to-contact/person-to-contact";
import {Supplier} from "../supplier/supplier";

export interface PersonContactsSupplier {
 id:number
 personToContact:PersonToContact
 supplier:Supplier
 }
