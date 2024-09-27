import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { DDIService } from '../../_services/ddi.service';
import { IRegister } from '../../_models/interface/share-interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  private phoneRegex: RegExp = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?/i;
  private route = inject(Router);
  /**Esta é a forma correta de tipagem de fomularios, ja inicia a variavel */
  private fb = inject(NonNullableFormBuilder);
 protected registerForm = this.fb.group({

  avatar: ['', { validators: [Validators.required], updateOn: 'blur' }],
  country: ['', { validators: [Validators.required], updateOn: 'blur' }],
  companyName: ['', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(16)], updateOn: 'blur' }],
  displayName: ['', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(16)], updateOn: 'blur' }],
  email: ['', { validators: [Validators.required, Validators.pattern(this.emailRegex)], updateOn: 'blur' }],
  password: ['', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'blur' }],
  phone: ['', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.phoneRegex)], updateOn: 'blur' }]

});



  constructor(private authServices: AuthenticationService, private ddiService: DDIService) {

  }

  ngOnInit(): void {


  this.ddiService.getDDI().subscribe(ddi => console.log(ddi));

  }


  goBack() {
    this.route.navigateByUrl("/body");
    this.registerForm.reset();

  }


  submitForms() {

    if (!this.registerForm.valid) {
      this.registerForm.setValidators(Validators.required);
    }

    this.authServices.logInWithEmailAndPassword({
      email: <string>this.registerForm.value.email,
      password: <string> this.registerForm.value.password
    }).subscribe(
      {
        next: () => {
          this.login();
        },
        error: (err: HttpErrorResponse) => {
          this.route.navigate(['/body']);

        },

      }
    );

  }

  login = () => {
    this.route.navigate(['/home']);

    this.registerForm.reset;
  }




}


