import { inject, Injectable } from '@angular/core';
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore';
import {
  asyncScheduler,
  from,
  scheduled,
  take,
  tap
} from 'rxjs';
import { IDdiEN, IRegister } from '../_models/interface/share-interfaces';
import { DialogService } from '../_share/pop-up/dialog.service';
import { ErrorSnackBarService } from '../_share/pop-up/error-pop-up/error-snack-bar.service';
import { UnSubscription } from '../_share/UnSubscription';
import { AuthenticationService } from './authentication.service';
import { CountryCodesService } from './mock-up/CountryCodes.service';

const db = getFirestore();

@Injectable({
  providedIn: 'root',
})
export class FirestoreDatabaseService extends UnSubscription {
  private popError = inject(ErrorSnackBarService);
  private popSuccess = inject(DialogService);
  private mockUpService = inject(CountryCodesService);
  // ddiItem$!: BehaviorSubject<IDdi[]>;

  constructor(
    private firestore: Firestore,
    private autenticationService: AuthenticationService
  ) {
    super();
  }

  /**
   *
   * @param data recebe 1 registro e salva  no firebase e cria o User
   */
  saveRegisterPromise = async (data: IRegister) => {
    /**Converte para array, remove o "hifem", volto para string, remove a virgular e junta retornando uma string*/
    const phoneWithOutHifen = data.phone
      .split('')
      .filter((data) => data !== '-')
      .toString()
      .split(',')
      .join('');

    try {
      const docLocal = doc(db, 'register', phoneWithOutHifen);
      const ddi = setDoc(docLocal, { ...data, merge: true });
      this.popSuccess.openDialogSingInSuccess();
    } catch (e) {
      this.popError.openErrorSnackBar(4000, e as string);
    }
  };

  /**Fui Usando para salvar os paises no Firebase Database */
  saveDDIWithPromise = async () => {
    try {
      this.mockUpService.fireBaseddiData().forEach((element: IDdiEN) => {
        const docLocal = doc(db, 'ddiEN', element.name);
        const ddi = setDoc(docLocal, element, { merge: true });
      });
    } catch (error) {
      this.popError.openErrorSnackBar(20000, error as string);
    }
  };

  /**Fui Usando para salvar os paises no Firebase Database */
  saveDDIObservable = () => {
    let setLocal;
    this.mockUpService.fireBaseddiData().forEach((element: IDdiEN) => {
      const docLocal = doc(db, 'ddiEN', element.phone);
      setLocal = setDoc(docLocal, element, { merge: true });
      from(setLocal);
    });
  };

  getDDIPT = () => {
    const localCollection = collection(db, 'ddi');
    return collectionData(localCollection).pipe(
      take(1),
      tap((data: any[]) => {
        return scheduled(data, asyncScheduler);
      })
    );
  };
  getDDIEN = () => {
    const localCollection = collection(db, 'ddiEN');
    return collectionData(localCollection).pipe(
      take(1),
      tap((data: any[]) => {
        return scheduled(data, asyncScheduler);
      })
    );
  };
}
