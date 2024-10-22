import { Client } from "./client/client"
import { PersonToContact } from "./personToContact"


export class PersonContactsClient{
    
    id:number
    personToContactId:number | null
    personToContact:PersonToContact
    clientId:number | null
    client:Client | null

    constructor(){
        this.id=0
    }

}