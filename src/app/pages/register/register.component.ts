import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDdi } from '../../_models/interface/share-interfaces';
import { AuthenticationService } from '../../_services/authentication.service';
import { FirestoreDatabaseService } from '../../_services/firestore-database.service';

type TAvatar = {
 image: string;
 gender: string;

}


const emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneRegex: RegExp = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?/i;
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  protected selectedAvatar: TAvatar = { image: '', gender: ''};
  protected showCustomAvatarUpload: boolean = false;
  protected avatar: Signal< string | ArrayBuffer>= signal( "./../../../assets/images/login/no_avatar.png");
  protected country: string = "Portugal"
  protected Ddi: IDdi[] = [];
  protected localRegister!: IDdi;
  protected phone: string = "0351";

  private route = inject(Router);
  /**Esta é a forma correta de tipagem de fomularios, ja inicia a variavel */
  private fb = inject(NonNullableFormBuilder);
  protected registerForm = this.fb.group({
    avatar: [this.selectedAvatar.image, { validators: [Validators.required], updateOn: 'blur' }],
    companyName: ['', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(16)], updateOn: 'blur' }],
    displayName: ['', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(16)], updateOn: 'blur' }],
    email: ['', { validators: [Validators.required, Validators.pattern(emailRegex)], updateOn: 'blur' }],
    password: ['', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'blur' }],
    country: [this.country, { validators: [Validators.required], updateOn: 'blur' }],
    phone: [+this.phone, { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(phoneRegex)], updateOn: 'blur' }]

  });



  constructor(private authServices: AuthenticationService, private firestoreDadabaseService: FirestoreDatabaseService) { }

  ngOnInit(): void {
    
  this.firestoreDadabaseService.getDDI().subscribe(itens => console.log(itens))
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
      password: <string>this.registerForm.value.password
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

  onAvatarChange(): void {
    console.log('Arquivo selecionado:', this.selectedAvatar.gender);


    this.showCustomAvatarUpload = this.selectedAvatar.gender === 'custom';
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name);
      // Aqui você pode tratar o upload do arquivo como necessário
    }
  }

}


