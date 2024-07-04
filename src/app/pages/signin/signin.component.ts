export interface localForms {
  email: string , password: string
}
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent  implements OnInit{
  private emailRegex:RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  private fb = inject(UntypedFormBuilder);
  route = inject(Router);
  autenticationForm!: UntypedFormGroup ;
  isLogin: boolean = false;

  constructor(private authServices: AuthenticationService) {

  }

  ngOnInit(): void {
    this.autenticationForm = this.fb.group({
         email: ['',  {validators: [Validators.required, Validators.pattern(this.emailRegex) ], updateOn: 'blur'}],
         password: ['', {validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'blur'}]

    });

  }


  goBack() {
    this.route.navigateByUrl("/")
    // this.autenticationForm.invalid

  }


  submitForms() {

    if (!this.autenticationForm.valid) {
       this.autenticationForm.setValidators(Validators.required)
       }

     this.authServices.signIn({
      email: this.autenticationForm.value.email,
      password: this.autenticationForm.value.password
     }).subscribe(
      {
        next: val => {
          this.route.navigate(['/home']);
          this.isLogin = !this.isLogin;
          this.autenticationForm.reset;
          // this.autenticationForm

        },
        error: err => {
          console.log('Ocorreu um Erro');
          this.isLogin = false;
        },
        // complete: () => console.log('Fim da Stream de dados')
      }
     );
  }

}
