
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { DialogService } from '../../_share/pop-up/dialog-slow.service';
import { DialogSlowComponent } from '../../_share/pop-up/dialog-slow/dialog-slow.component';




@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,  MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  private emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  private fb = inject(UntypedFormBuilder);
  private route = inject(Router);
 // dialogRefSlow = inject(MatDialogRef<DialogSlowComponent>);
  autenticationForm!: UntypedFormGroup;



  constructor(private authServices: AuthenticationService, private dialogService: DialogService, public dialogRef: MatDialogRef<DialogSlowComponent>) {

  }

  ngOnInit(): void {
    this.autenticationForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.pattern(this.emailRegex)], updateOn: 'blur' }],
      password: ['', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'blur' }]

    });
    ;

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
    this.dialogService.openDialogSucess();
    this.route.navigate(['/home']);
    this.autenticationForm.reset;
  }

  localOpenDialogRegistration = () => {
    this.dialogService.openDialogRegistration('3000ms', '1500ms');
    // this.dialog.afterAllClosed.subscribe(() => {

    //   if (this.dialogService.sigNalId()) {
    //     this.route.navigateByUrl("/register");

    //   } else {
    //     this.goBack();
    //   }

    // });
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log("dentro do after");
      if (result) {
        this.route.navigateByUrl("/register");

      } else {
        this.goBack();
      }
    });





  };

}




