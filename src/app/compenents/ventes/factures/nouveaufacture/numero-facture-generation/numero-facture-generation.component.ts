import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-numero-facture-generation',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './numero-facture-generation.component.html',
  styleUrl: './numero-facture-generation.component.css'
})
export class NumeroFactureGenerationComponent {
  choix='automatique'
  numeroSuivant:string='00001';
  prifixe:string='Fa-';
  numeroFacture=this.prifixe+this.numeroSuivant;
  enregistrer(){
    console.log("hhhhhhhhhhhhhhhh");
  }
}
