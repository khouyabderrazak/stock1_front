import { Component, OnInit } from '@angular/core';
import {CardModule} from 'primeng/card'
import {ButtonModule} from 'primeng/button'
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ImageComponent } from "../../image/image.component";
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client/client';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-client',
    standalone: true,
    templateUrl: './client.component.html',
    styleUrl: './client.component.css',
    imports: [CardModule, ButtonModule, RouterModule, TableModule, ImageComponent, LoadingIndicatorComponent ,CommonModule],
    providers:[ClientService]
})
export class ClientComponent implements OnInit {
onOneRowSelected(arg0: any) {
throw new Error('Method not implemented.');
}
  selectedClients=[]
  clients:Client[]=[]

  constructor(
    private clientService:ClientService
  ){

  }
  ngOnInit(): void {
   
    this.clientService.getClients().subscribe(
      (res)=>{
        this.clients=res;
      }
    )

  }
  

}
