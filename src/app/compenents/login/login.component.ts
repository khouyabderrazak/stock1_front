import { AfterViewInit, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { StypeForInputDirective } from '../../derictives/stype-for-input.directive';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgToastService, NgToastModule } from 'ng-angular-popup';
import { ToasterPosition } from 'ng-angular-popup';
import { UserStoreService } from '../../services/user-store.service';
import { LoaderComponent } from '../loader/loader.component';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, DialogModule, CardModule, StypeForInputDirective, CommonModule, RouterModule, ReactiveFormsModule, ToastModule, NgToastModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {


  @Output() isThentified: EventEmitter<Boolean> = new EventEmitter<Boolean>()

  User: FormGroup
  ToasterPosition = ToasterPosition
  isSubmited = false
  isAthenticate = false;
  loading = false;
  isLogin: boolean = true;
  isShowLoader:boolean=false;

  activatedRoute = inject(ActivatedRoute)

  constructor(private route: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService,
    private toast: NgToastService,

    private http: HttpClient,
    private userStore: UserStoreService
  ) {
    this.User = this.fb.group(
      {
        'username': ['', Validators.required],
        'password': ['', Validators.required]
      }
    );

    if (auth.isLoggedIn()) {
      this.route.navigate(['/dashboard'])
    }

  }

  login() {
  
    this.isSubmited=true;
    this.isShowLoader=true;

    if (this.User.valid) {
      if (this.isLogin) {
        this.auth.login(this.http, this.User.value).subscribe(
          (res) => {

            this.showSuccess(res?.message)
            this.auth.storeToken(res?.token?.accessToken);
            this.auth.storeRefreshToken(res?.token?.refreshToken);
            this.userStore.setUsername(this.auth.getUserNameFromToken())
            setTimeout(
              () => {
                this.isShowLoader=false;
                this.route.navigate(['/dashboard'])
              }, 1000
            )
          },
          (err) => {
            this.isShowLoader=false;
            console.log(err)
            this.showError(err?.error?.message)
          }
        )

      } else {
        this.auth.signUp(this.http, this.User.value).subscribe({
          next: (res) => {
            this.User.reset();
            this.showSuccess(res?.message)
            setTimeout(
              () => {
                this.toggleIsLogin();
                setTimeout(
                  ()=>{
                    this.isShowLoader=false;
                  },
                  500
                )

              }, 1000
            )
          },
          error: (err) => {
            this.isShowLoader=false;
            this.showError(err?.message);
          }
        }
        )
      }

    }else{
          this.isShowLoader=false;
    }
  }

  toggleIsLogin() {
    this.isSubmited=false;
    this.isLogin = !this.isLogin

    this.User.reset();
    if (!this.isLogin) {
      (<FormGroup>this.User).addControl(

        'email',
        new FormControl(null, [Validators.required, Validators.email])
      )
    } else {
      (<FormGroup>this.User).removeControl('email');
    }

  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

}
