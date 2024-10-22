import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajustement-de-stock',
  standalone: true,
  imports: [],
  templateUrl: './ajustement-de-stock.component.html',
  styleUrl: './ajustement-de-stock.component.css'
})
export class AjustementDeStockComponent {

  
  constructor( private routre:ActivatedRoute ) {
        
     console.log(this.routre.snapshot.data['articles']);
  }

}
