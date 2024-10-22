import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  checkEmail(control: AbstractControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.isEmailAlreadyExist(control?.value, this.httpClient).subscribe({
        next: (res) => {
          if (res) {
            resolve({ checkEmail: true });
          } else {
            resolve(null);
          }
        }
      });
    });
  }
}
