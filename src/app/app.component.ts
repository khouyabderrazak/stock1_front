import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Router, RouterModule, RouterOutlet,Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { DashboardComponent } from './compenents/dashboard/dashboard.component';
import { LoginComponent } from './compenents/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FontAwesomeModule,RouterModule,FormsModule,ButtonModule,DashboardComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',


})
export class AppComponent {

  

  

  constructor(private route:Router){
     //  this.route.navigate(['/']);
  }

  isEthentified: Boolean=false;

  chechEthentified(event: Boolean) {
         this.isEthentified=event;
  }

}
