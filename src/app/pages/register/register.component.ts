import { ModelRegister } from '../../_models/model/share-models';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IDdiEN, IRegister } from '../../_models/interface/share-interfaces';
import { AuthenticationService } from '../../_services/authentication.service';
import { FirestoreDatabaseService } from '../../_services/firestore-database.service';
import { UnSubscription } from '../../_share/UnSubscription';
import { ErrorSnackBarService } from '../../_share/pop-up/error-pop-up/error-snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../_share/pop-up/dialog.service';

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

const passwordRegex: RegExp =
  /(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,16})/;
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends UnSubscription {
  protected avatar: string = '';
  protected selectedItensAvatarGender: TItensClass = {
    image: './../../../assets/images/login/no_avatar.png',
    gender: 'none',
  };
  protected showCustomAvatarUpload: boolean = false;
  protected countryAndDdi: IDdiEN = { name: 'Portugal', phone: '0351' };
  protected wordDdi: IDdiEN[] = [];
  protected phone!: number;

  private route = inject(Router);
  /**Esta é a forma correta de tipagem de fomularios, ja inicia a variavel */
  private fb = inject(NonNullableFormBuilder);
  protected registerForm = this.fb.group({
    avatar: [
      this.selectedItensAvatarGender.image,
      {
        validators: [Validators.required],
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
          Validators.pattern(passwordRegex),
        ],
        updateOn: 'blur',
      },
    ],
    country: ['', { validators: [Validators.required], updateOn: 'blur' }],
    phone: [
      '',
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

  constructor(
    private authServices: AuthenticationService,
    private popError: ErrorSnackBarService,
    private firestoreDadabaseService: FirestoreDatabaseService,
    private popSuccess: DialogService
  ) {
    super();
  }

  ngOnInit(): void {
     this.firestoreDadabaseService.saveDDIWithPromise();
    this.firestoreDadabaseService.getDDIEN().subscribe({
      next: (value) => this.wordDdi.push(...value),
      error: (err) => this.popError.openErrorSnackBar(3000, err),
      complete: () => console.log('Finishing up'),
    });
  }

  goBack() {
    this.route.navigateByUrl('/body');
    this.registerForm.reset();
  }

  submitForms() {
    const register = new ModelRegister(this.registerForm.value as IRegister);

    if (!this.registerForm.valid) {
      this.registerForm.setValidators(Validators.required);
    }
    this.firestoreDadabaseService.saveRegisterPromise(register);
    this.registerForm.reset();
  }

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
  

      default:
        'none';
        break;
    }
    //   console.log('Arquivo selecionado:', this.selectedItensAvatarGender.gender);

    this.showCustomAvatarUpload =
      this.selectedItensAvatarGender.gender === 'custom';
  }
  onChangeDDI() {
    this.registerForm
      .get('phone')
      ?.setValue(this.countryAndDdi.phone + '-' + this.phone);
    this.registerForm.get('country')?.setValue(this.countryAndDdi.name);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Obtém o arquivo selecionado
    const reader = new FileReader(); // Cria uma instância do FileReader

    // Verifica se o arquivo é válido e corresponde ao regex de imagem
    if (file && imgRegex.test(file.name)) {
      // Define a função a ser executada quando a leitura for concluída
      reader.onload = () => {
        this.selectedItensAvatarGender.image = reader.result as string; // Armazena a URL da imagem
       this.registerForm.get('avatar')?.setValue(this.selectedItensAvatarGender.image);
      };

      // Inicia a leitura do arquivo como Data URL
      reader.readAsDataURL(file);
    } else {
      this.popError.openErrorSnackBar(3000,'Ups...Something Wrong, try again');
      this.registerForm.get('avatar')?.setErrors({errors: true});

      console.error('Arquivo inválido ou não é uma imagem');
    }
  }
}
