import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DialogService } from '../../_share/pop-up/dialog-slow.service';
import { CommonModule } from '@angular/common';
import { ErrorSnackBarService } from '../../_share/pop-up/error-pop-up/error-snack-bar.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { DialogRecouverComponent } from '../../_share/pop-up/dialog-recouver/dialog-recouver.component';
import { DialogPopUpComponent } from '../../_share/pop-up/dialog-pop-up/dialog-pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './recouver.component.html',
  styleUrl: './recouver.component.scss'
})
export class RecouverComponent {

  private emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  private fb = inject(UntypedFormBuilder);
  private route = inject(Router);
  private errorSnackBarService = inject(ErrorSnackBarService);
  recoverForm!: UntypedFormGroup;
  private dialog = inject(MatDialog);



  constructor(private authServices: AuthenticationService, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.recoverForm = this.fb.nonNullable.group({
      email: ['', { validators: [Validators.required, Validators.pattern(this.emailRegex)], updateOn: 'blur' }],

    });
  }


  goBack() {
    this.route.navigateByUrl("/body");
    this.recoverForm.reset();
  }


  submitForms() {

    if (!this.recoverForm.valid) {
      this.recoverForm.setValidators(Validators.required);
    }

    this.authServices.reSendPassword(
       this.recoverForm.value.email,
    ).subscribe(
      {
        next: () => {
          this.openDialogRecouver();
          this.route.navigate(['/autentication']);
        },
        error: (err: HttpErrorResponse) => {
         this.errorSnackBarService.openErrorSnackBar(3000, 'Ops! Try Again!');
          this.route.navigate(['/body']);
        },
      }
    );

  }
  openDialogSucess = () => {
    this.dialog.open(DialogPopUpComponent, {
    });

  }

  openDialogRecouver = () => {
    this.dialog.open(DialogRecouverComponent, {
      enterAnimationDuration: '3000ms',
      exitAnimationDuration: '2000ms'
    });

  }



}



