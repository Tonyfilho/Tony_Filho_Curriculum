
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';



@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  private emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  private fb = inject(UntypedFormBuilder);
  route = inject(Router);
  autenticationForm!: UntypedFormGroup;
  isLogin: boolean = false;


  constructor(private authServices: AuthenticationService,) {
   // this.authServices.userCredential$?.subscribe(d => console.log("UserCredential: ", d));

  }

  ngOnInit(): void {
    this.autenticationForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.pattern(this.emailRegex)], updateOn: 'blur' }],
      password: ['', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'blur' }]

    });

  }


  goBack() {
    this.route.navigateByUrl("/body")
     this.autenticationForm.reset();

  }


  submitForms() {

    if (!this.autenticationForm.valid) {
      this.autenticationForm.setValidators(Validators.required);
    }

    this.authServices.signInUserCredential({
      email: this.autenticationForm.value.email,
      password: this.autenticationForm.value.password
    }).subscribe(
      {
        next: val => {
         // console.log("success: ",  val.user)
          this.login();
        },
        error: (err: HttpErrorResponse) => {
        //  console.log('HTTP Error: ', err);
          this.route.navigate(['/body']);
          this.isLogin = false;
        },

      }
    );



  //  this.authServices.signInPromise({email: this.autenticationForm.value.email, password: this.autenticationForm.value.password});
  }

  login() {
    this.route.navigate(['/home']);
    this.isLogin = !this.isLogin;
    this.autenticationForm.reset;
  }


}


