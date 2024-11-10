import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, signal } from '@angular/core';
import {
  
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IDdi } from '../../_models/interface/share-interfaces';
import { AuthenticationService } from '../../_services/authentication.service';
import { FirestoreDatabaseService } from '../../_services/firestore-database.service';
import { UnSubscription } from '../../_share/UnSubscription';


type TItensClass = {
  image: string | ArrayBuffer | null;
  gender: string;
};

const imgRegex: RegExp = /^.*\.(jpg|jpeg|png)$/i;
const emailRegex: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneRegex: RegExp =
  /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?/i;

const providerEmailRegex: RegExp =
  /^(?!.*@(gmail|outlook|yahoo|protonmail|zoho|aol|gmx|mail|icloud|yandex|tutanota|mailfence|rediffmail|lycos|hushmail|mailru|fastmail|tempmail|guerrillamail|10minutemail|inbox|hotmail|sapomail|netcabo|clix)\.(com|ru|net|org|lv)).+$/;

const passwordRegex: RegExp = /(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,16})/;
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends UnSubscription {
  protected selectedItensAvatarGender: TItensClass = {
    image: './../../../assets/images/login/no_avatar.png',
    gender: 'none',
  };
  protected showCustomAvatarUpload: boolean = false;
  protected avatar: string | null = null;
  protected countryAndDdi = {country: 'Portugal', fone: '0351'};
  protected wordDdi: IDdi[] = [];
 
 

  private route = inject(Router);
  /**Esta é a forma correta de tipagem de fomularios, ja inicia a variavel */
  private fb = inject(NonNullableFormBuilder);
  protected registerForm = this.fb.group({
    avatar: [
      this.selectedItensAvatarGender.image,
      {
        validators: [Validators.required, Validators.pattern(imgRegex)],
        updateOn: 'blur',
      },
    ],
    gender: ['none', { validators: [Validators.required], updateOn: 'blur' }],
    companyName: [
      '',
      {
        validators: [Validators.required],
        updateOn: 'blur',
      },
    ],
    displayName: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
        updateOn: 'blur',
      },
    ],
    email: [
      '',
      {
        validators: [
          Validators.required,
          Validators.pattern(providerEmailRegex),
          Validators.pattern(emailRegex),
        ],
        updateOn: 'blur',
      },
    ],
    password: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(passwordRegex)
        ],
        updateOn: 'blur',
      },
    ],
    country: [
      
      { validators: [Validators.required], updateOn: 'blur' },
    ],
    phone: [
     
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(phoneRegex),
        ],
        updateOn: 'blur',
      },
    ],
  });
  item: any;

  constructor(
    private authServices: AuthenticationService,
    private firestoreDadabaseService: FirestoreDatabaseService
  ) {
    super();
   
 
  }

  ngOnInit(): void {
    this.firestoreDadabaseService.getDDI().subscribe((itens) => {
      this.wordDdi.push(...itens)
      
    });
  }

  goBack() {
    this.route.navigateByUrl('/body');
    this.registerForm.reset();
  }

  submitForms() {
    if (!this.registerForm.valid) {
      this.registerForm.setValidators(Validators.required);
    }

    this.authServices
      .logInWithEmailAndPassword({
        email: <string>this.registerForm.value.email,
        password: <string>this.registerForm.value.password,
      })
      .subscribe({
        next: () => {
          this.login();
        },
        error: (err: HttpErrorResponse) => {
          this.route.navigate(['/body']);
        },
      });
  }

  login = () => {
    this.route.navigate(['/home']);
    this.registerForm.reset;
  };

  onAvatarChange(): void {
    switch (this.selectedItensAvatarGender.gender) {
      case 'male':
        this.selectedItensAvatarGender.image =
          './../../../assets/images/login/male_avatar.png';
        break;
      case 'female':
        this.selectedItensAvatarGender.image =
          './../../../assets/images/login/female_avatar.png';
        break;
      case 'custom':
        this.selectedItensAvatarGender.image =
          './../../../assets/images/login/no_avatar.png';
        break;

      default:
        'none';
        break;
    }
    //   console.log('Arquivo selecionado:', this.selectedItensAvatarGender.gender);

    this.showCustomAvatarUpload =
      this.selectedItensAvatarGender.gender === 'custom';
  }
  changeDDI() {    
    this.registerForm.get('phone')?.setValue(this.countryAndDdi.fone as never);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file && imgRegex.test(file.name)) {
      const reader = new FileReader();
      reader.onload = () => {
        /**onload vai carregar o arquivo e quando terminar manda pata reader.readAsDataURL */
        this.selectedItensAvatarGender.image = reader.result; // Armazena a URL da imagem
      };
      reader.readAsDataURL(file); // Carrega o arquivo como Data URL
      /**Salvando na Db */
    } else {
      this.registerForm.controls.avatar.setErrors({ incorrect: true });
      setInterval(() => {
        this.avatar = null;
      }, 3000);
    }
  }
}
