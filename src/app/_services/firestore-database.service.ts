import { ErrorHandler, inject, Injectable } from '@angular/core';
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  asyncScheduler,
  BehaviorSubject,
  catchError,
  from,
  merge,
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
import { addDoc } from 'firebase/firestore';

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
      const ddi = setDoc(docLocal, {...data, merge: true});
    } catch (e) {
      this.popError.openErrorSnackBar(30000, e as string);
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
