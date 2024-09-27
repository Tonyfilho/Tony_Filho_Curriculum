
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { DialogService } from '../../_share/pop-up/dialog.service';
import { FirestoreDatabaseService } from '../../_services/firestore-database.service';




@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  private emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  private fb = inject(UntypedFormBuilder);
  private route = inject(Router);
  autenticationForm!: UntypedFormGroup;
  fireStoreService = inject(FirestoreDatabaseService);


  constructor(private authServices: AuthenticationService, private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.autenticationForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.pattern(this.emailRegex)], updateOn: 'blur' }],
      password: ['', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'blur' }]

    });

    this.fireStoreService.saveddiWithPromise();
  }


  goBack() {
    this.route.navigateByUrl("/autentication");
    this.autenticationForm.reset();

  }


  submitForms() {

    if (!this.autenticationForm.valid) {
      this.autenticationForm.setValidators(Validators.required);
    }

    this.authServices.logInWithEmailAndPassword({
      email: this.autenticationForm.value.email,
      password: this.autenticationForm.value.password
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
    this.dialogService.openDialogSingInSuccess();
    this.route.navigate(['/home']);
    this.autenticationForm.reset;
  }

  localOpenDialogRegistration = () => {
    this.dialogService.openDialogRegistration('3000ms', '1500ms');
  };

}




