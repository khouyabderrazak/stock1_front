import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { StypeForInputDirective } from '../../derictives/stype-for-input.directive';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ButtonModule,DialogModule,CardModule , StypeForInputDirective ,CommonModule, RouterModule, ReactiveFormsModule , ToastModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers:[AuthService]
})
export class SignUPComponent {
  @Output() isThentified:EventEmitter<Boolean> =new EventEmitter<Boolean>() 

  User:FormGroup
  
  submit=false

  constructor(
              private route:Router,
              private fb:FormBuilder,
              private auth:AuthService,
              private messageService:MessageService,
              private http:HttpClient,
            ){
             this.User=this.fb.group(
                   {

                      'id':[0],
                      'email':['',[Validators.required,Validators.email]],
                      'username':['',Validators.required],
                      'password':['',Validators.required],
                      'token':[''],
                      'role':['']
                   }
             );
  }
  
  
  SignUp() {
    console.log(this.User);
    this.submit=true;
    if(this.User.valid){
         this.auth.signUp(this.http,this.User.value).subscribe({
         next:(res)=>{
             console.log(res)
             this.User.reset();
             
            this.showSuccess(res?.message)

             setTimeout(
                  ()=>this.route.navigate(['/login']),3000
              )
          },
         error:(err)=>{
            // console.log("message2 :" + err);
            this.showError(err?.message);
          }
        }
        )
    }
  }
  
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
  
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

}
