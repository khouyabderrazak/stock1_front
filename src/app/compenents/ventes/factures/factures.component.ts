import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {CardModule} from 'primeng/card'
import {ButtonModule} from 'primeng/button'
import {ToastModule} from 'primeng/toast'
import {TableModule} from 'primeng/table'
import { ImageComponent } from '../../image/image.component';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';
import { InvoiceSellService } from '../../../services/invoice-sell.service';
import { Invoice } from '../../../models/invoice.model';


@Component({
  selector: 'app-factures',
  standalone: true,
  imports: [RouterModule,ToastModule ,ButtonModule,CardModule,TableModule,ImageComponent,CommonModule , LoadingIndicatorComponent],
  templateUrl: './factures.component.html',
  styleUrl: './factures.component.css'
})
export class FacturesComponent {
  factures:Invoice[]=[]
  selectedFactures=[]


  constructor(private invoiceService:InvoiceSellService 
              ,private router:Router   
  ){
            this.invoiceService.getInvoiceSelles().subscribe(
              (res)=>{
                    this.factures=res;
              },
               (error)=>{
                console.log(error)
               }
            )
  }

  onOneRowSelected(id:number){
         this.router.navigate(['dashboard','ventes','detailsFacture',id=id]);
  }
}
