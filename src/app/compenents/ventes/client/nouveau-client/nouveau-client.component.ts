import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgControl, NgControlStatusGroup, Validators, ReactiveFormsModule, FormArray, ValidatorFn } from '@angular/forms'; // Ajout de ReactiveFormsModule
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DonneeService } from '../../../../services/constants.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TaxService } from '../../../../services/tax.service';
import { PaymentConditionsService } from '../../../../services/payment-conditions.service';
import { CountryService } from '../../../../services/country.service';
import { FilesUploadInputComponent } from "../../../controls/files-upload-input/files-upload-input.component";
import { PanelModule } from 'primeng/panel';
import { Client } from '../../../../models/client/client';

import { TableModule } from 'primeng/table';
import { ClientService } from '../../../../services/client.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PersonToContact } from '../../../../models/personToContact';

@Component({
    selector: 'app-nouveau-client',
    standalone: true,
    templateUrl: './nouveau-client.component.html',
    styleUrl: './nouveau-client.component.css',
    providers: [ DonneeService, TaxService, PaymentConditionsService, CountryService,ClientService,NgControlStatusGroup],
    imports: [
        InputIconModule, 
        IconFieldModule, 
        CardModule, 
        ButtonModule, 
        CommonModule, 
        RadioButtonModule, 
        FormsModule, 
        RouterModule, 
        DropdownModule, 
        InputTextModule, 
        TabViewModule, 
        DividerModule, 
        InputTextareaModule, 
        FilesUploadInputComponent,
        PanelModule, 
        TableModule,
        ReactiveFormsModule,
        ToastModule
    ]
})
export class NouveauClientComponent implements OnInit {
  conditions = [];
  devises = [];
  taxes = [];
  client: Client;
  Titres: { id: number; label: string }[];
  clientContacts: FormArray;
  associatedDocs: File[] = [];
  submit=false;
  monFormulaire: FormGroup;

  constructor(
    private fb: FormBuilder,
    private donneesService: DonneeService,
    private taxesService: TaxService,
    private pytCdtService: PaymentConditionsService,
    private countryService: CountryService,
    private clientService: ClientService,
    private messageService: MessageService,
  ) {

    this.monFormulaire = this.fb.group({
      type: [0, Validators.required], // Type de client
      title: [1, Validators.required], // Titre
      firstName: [null, Validators.required], // Prénom
      lastName: [null, Validators.required], // Nom de famille
      companyName: [null], // Nom de la société
      displayName: [null,Validators.required], // Nom d'affichage du client
      email: [null, Validators.email], // E-mail du client
      phonePro: [null], // Téléphone professionnel
      phonePortable: [null], // Téléphone portable
      currencyId: [null], // Devise
      taxId: [null], // Taxe
      paymentConditionId: [null], // Conditions de payment
      billingAddress:this.fb.group({
        country: [null], // Pays / Région
        addressLine1: [null], // Adresse - rue 1
        addressLine2: [null], // Adresse - rue 2
        city: [null], // Ville
        state: [null], // État
        postalCode: [null], // Code postal
        phoneNumber: [null], // Téléphone
        fax: [null], // Numéro de télécopie
      }),

      deliveryAddress: this.fb.group({
        country: [null], // Pays / Région
        addressLine1: [null], // Adresse - rue 1
        addressLine2: [null], // Adresse - rue 2
        city: [null], // Ville
        state: [null], // État
        postalCode: [null], // Code postal
        phoneNumber: [null], // Téléphone
        fax: [null], // Numéro de télécopie
      }),
      note: [null],
      clientContacts: this.fb.array([]), // Remarques
    });
    
    // this.monFormulaire?.get('deliveryAddress.country')?.removeValidators([Validators.required]);
   
  }


   billingAddressValidator(control: FormGroup): ValidatorFn {
    return (formGroup: FormGroup) => {
      const address = formGroup.get('billingAddress') as FormGroup;
      const hasValue = Object.values(address.controls).some(control => control.value);
     
     formGroup.get('country').clearValidators();

      return hasValue ? null : { billingAddressRequired: true };
    };
  }

  ngOnInit(): void {
    this.Titres = this.donneesService.Titres;
    this.getTaxes();
    this.pytCdtService.getPaymentConditions().subscribe((value) => {
      this.conditions = value;
    });
    this.devises = this.donneesService.devises;
  }
  



  getTaxes() {
    this.taxesService.getTaxes().subscribe((response: any) => {
      response.forEach((task: any) => {
        task.title = task.title + '[' + task.ratio + '%]';
      });
      this.taxes = response;
    });
  }

  addRow() {
    this.clientContacts = this.monFormulaire.get('clientContacts') as FormArray;
  
     this.clientContacts.push(
      this.fb.group({
        title: ['', Validators.required], // Titre
        firstName: ['', Validators.required], // Prénom
        lastName: ['', Validators.required], // Nom de famille
        email: [''], // Adresse e-mail
        phoneNumberPro: [''], // Téléphone professionnel
        phoneNumberPortable: [''], // Téléphone portable
        designation: [''], // Désignation
        department: [''], // Département
      })
    );

  }


  removeRow(index: number) {
    this.clientContacts.removeAt(index);
  }
  


  setAssociatedDocs(files: File[]) {
    this.associatedDocs = files;
  }

  Enregistrer() {

    this.submit=true;

    this.client=this.monFormulaire.value as Client;
   
    if(this.isAllVides(this.monFormulaire.get('billingAddress') as FormGroup)){
       this.client.billingAddress=null;         
    }
   
    if(this.isAllVides(this.monFormulaire.get('deliveryAddress') as FormGroup)){
       this.client.deliveryAddress=null;         
    }
  
    var clientContacts=[]

     if(this.clientContacts?.length>0){
    
      this.clientContacts.value.forEach(  
    
        (p)=>{

           clientContacts.push(
               {
                personToContactId:null, 
                personToContact:p as PersonToContact,
                clientId:null,
                client:null
               }
           )  
        }
      );
        this.client.clientContacts=clientContacts;  
     }

     console.log(this.client);

     if (this.monFormulaire.valid) {
      this.clientService.addClient(this.client,this.associatedDocs).subscribe(
        (res) => {
          this.showSuccess("Le client a été enregistré avec succès");
        },
        (error) => {
          console.log(error);
          this.showError("L'enregistrement du client a échoué");
        }
      );
    } else {
      this.showError("Veuillez remplir tous les champs requis");
    }
    
     
  }

  isAllVides(FormGroup:FormGroup){
    const hasValue = Object.values(FormGroup.controls).some(control => control.value);
    if(hasValue){
      return false;
    }else{
      return true;
    }
  }

  
  showError(message: string){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSuccess(message: string){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

}

