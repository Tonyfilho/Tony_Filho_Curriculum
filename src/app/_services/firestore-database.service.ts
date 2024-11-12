import { ErrorHandler, inject, Injectable } from '@angular/core';
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  asyncScheduler,
  BehaviorSubject,
  catchError,
  from,
  Observable,
  of,
  scheduled,
  take,
  tap,
} from 'rxjs';
import { IDdi, IDdiEN, IRegister } from '../_models/interface/share-interfaces';
import { DialogService } from '../_share/pop-up/dialog.service';
import { ErrorSnackBarService } from '../_share/pop-up/error-pop-up/error-snack-bar.service';
import { CountryCodesService } from './mock-up/CountryCodes.service';
import {
  collectionData,
  Firestore,
  collection,
  getFirestore,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { UnSubscription } from '../_share/UnSubscription';
import { FirebaseError } from '@angular/fire/app';

const db = getFirestore();

@Injectable({
  providedIn: 'root',
})
export class FirestoreDatabaseService extends UnSubscription {
  private popError = inject(ErrorSnackBarService);
  private popSuccess = inject(DialogService);
  private mockUpService = inject(CountryCodesService);
  // ddiItem$!: BehaviorSubject<IDdi[]>;

  constructor(firestore: Firestore) {
    super();
  }

  saveRegisterPromise = (data: IRegister) => {
      /**Converte para array, remove o "hifem", volto para string, remove a virgular e junta retornando uma string*/
      const phoneWithOutHifen = data.phone.split('').filter(data => data !== '-').toString().split(',').join('');
    const docRegister = doc(db, 'register',phoneWithOutHifen);
    try {
      setDoc(docRegister, data, {merge: true});
      this.popSuccess.openDialogSuccess();

      console.log('Document written with ID: ', docRegister.id);
    } catch (e) {
      this.popError.openErrorSnackBar(30000, e as string);
    }
  };


  /**Fui Usando para salvar os paises no Firebase Database */
  saveDDIWithPromise = () => {
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
