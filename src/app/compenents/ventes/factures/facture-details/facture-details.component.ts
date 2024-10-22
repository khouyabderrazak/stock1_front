import { Component } from '@angular/core';
import { InvoiceSellService } from '../../../../services/invoice-sell.service';
import { Invoice } from '../../../../models/invoice.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facture-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facture-details.component.html',
  styleUrl: './facture-details.component.css'
})
export class FactureDetailsComponent {

  Invoice:Invoice

  constructor(private invoiceService:InvoiceSellService){
          this.invoiceService.getSingleInvoice(24).subscribe(
            (res)=>{
                this.Invoice=res;
            }
          );
  }

}
