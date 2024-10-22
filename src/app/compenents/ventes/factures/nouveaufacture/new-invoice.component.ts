import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModelComponent } from '../../../model/model.component';
import { ArticlesComponent } from '../../../articles/articles.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumeroFactureGenerationComponent } from './numero-facture-generation/numero-facture-generation.component';
import { DropdownModule } from "primeng/dropdown";
import { CardModule } from "primeng/card";
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { DividerModule } from "primeng/divider";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PanelModule } from "primeng/panel";
import { FileUploadModule } from "primeng/fileupload";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { TooltipModule } from "primeng/tooltip";
import { FilesUploadInputComponent } from "../../../controls/files-upload-input/files-upload-input.component";
import { FocusTrapModule } from "primeng/focustrap";
import { PaymentConditionsService } from "../../../../services/payment-conditions.service";
import { PaymentCondition } from "../../../../models/payment-condition/payment-condition";
import { SellerService } from "../../../../services/seller.service";
import { Seller } from "../../../../models/seller/seller";
import { ClientService } from "../../../../services/client.service";
import { ClientLite } from "../../../../models/client/client";
import { InputNumberModule } from "primeng/inputnumber";
import { InvoiceSellService } from "../../../../services/invoice-sell.service";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputGroupModule } from "primeng/inputgroup";
import { RouterModule } from '@angular/router';
import { ɵinitDomAdapter } from '@angular/platform-browser';

@Component({
  selector: 'new-invoice',
  standalone: true,
  imports: [FontAwesomeModule, ModelComponent, ArticlesComponent, CommonModule,
    NumeroFactureGenerationComponent, DropdownModule, CardModule,
    SidebarModule, ButtonModule, InputTextModule, CalendarModule, DividerModule, ReactiveFormsModule,
    InputTextareaModule, PanelModule, FileUploadModule, ToastModule, OverlayPanelModule, TooltipModule,
    FilesUploadInputComponent, FocusTrapModule, InputNumberModule, FormsModule, InputGroupAddonModule, InputGroupModule, RouterModule],
  templateUrl: './new-invoice.component.html',
  styleUrl: './new-invoice.component.css',
  providers: [MessageService, PaymentConditionsService, SellerService, ClientService, InvoiceSellService]
})

export class NewInvoiceComponent implements AfterViewInit {



  messages: string[] = [];
  @ViewChild(ArticlesComponent) articleCompenent: ArticlesComponent
  emptyMessages() {
    this.messages = []
    console.log(this.messages)
  }

  requiredValidator = {
    validators: Validators.required
  }
  currentDate = new Date();

  InvoiceForm: FormGroup = this.fb.group({

    id: [0],

    clientId: new FormControl(null, this.requiredValidator),

    nInvoice: ['Fa-988', Validators.required],

    nOrder: new FormControl(null),

    invoiceDate: new FormControl(this.datePipe.transform(new Date(),'yyyy-MM-dd'), this.requiredValidator),

    dueDate: new FormControl(null),

    paymentConditionId: new FormControl(null, this.requiredValidator),

    sellerId: new FormControl(null,),

    note: new FormControl(null),

    tabArticles: [null],

    generalConditions: ""
  });


  FormatDate(date: any) {
    if (date != null && date != undefined) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    } else
        return null
}

  articles = []
  isSubmit:boolean=false;

  constructor(
    private pytCdtService: PaymentConditionsService,
    private sellerService: SellerService,
    private fb: FormBuilder,
    private clientsService: ClientService,
    private invoiceSellService: InvoiceSellService,
    private datePipe:DatePipe,
    private messageService:MessageService
  ) {
       console.log(this.datePipe.transform(new Date(),'yyyy-MM-dd'))
       console.log(this.FormatDate(new Date()))
  }

  clients: ClientLite[] = []
  sellers: Seller[] = []
  conditions: PaymentCondition[] = []

  ngAfterViewInit() {

    this.pytCdtService.getPaymentConditions().subscribe(value => {
      this.conditions = value;
    })

    this.sellerService.getSellers().subscribe(value => {
      this.sellers = value
    })

    this.clientsService.getClientsLite().subscribe(value => {
      this.clients = value
    })

  

  }

  isValid(controlName:string):boolean{
      return  this.InvoiceForm.get(controlName)?.invalid && this.isSubmit;
  }

  associatedDocs: File[] = [];

  setAssociatedDocs(files: File[]) {
    this.associatedDocs = files;
  }


  async saveInvoice() {

    this.isSubmit=true;

    this.articleCompenent.submitBtn.nativeElement.click();

    console.log(this.InvoiceForm.value);

    if (this.InvoiceForm.valid) {
      this.invoiceSellService.AddInvoiceSell(this.InvoiceForm.value).subscribe(
        (res) => {
          this.showSuccess("invoice add with sucess")
          this.InvoiceForm.reset();
          this.articleCompenent.TabArticles.reset();
          this.articleCompenent.isSubmit=false;
          this.isSubmit=false;

        },
        (error) => {
          this.showError("some data are invalid")
        }
      )
    } else {
      this.showError("some data are invalid")
    }

  }

  sendData(data: any) {

    this.InvoiceForm.get('tabArticles').setValue(data);
  }

  showError(message: string){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSuccess(message: string){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }


}
