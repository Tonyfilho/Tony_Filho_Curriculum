import { inject, Injectable } from '@angular/core';
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import { BehaviorSubject, from, Observable, take, tap } from 'rxjs';
import { IDdi, IRegister } from '../_models/interface/share-interfaces';
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

const db = getFirestore();

@Injectable({
  providedIn: 'root',
})
export class FirestoreDatabaseService extends UnSubscription {
  private popError = inject(ErrorSnackBarService);
  private popSuccess = inject(DialogService);
  private mockUpService = inject(CountryCodesService);
  ddiItem$!: BehaviorSubject<IDdi[]>;

  constructor(firestore: Firestore) {
    super();
  }

  saveRegister = (data: IRegister) => {
    const register = doc(db, 'register', data.phone);
    try {
      setDoc(register, data);
      this.popSuccess.openDialogSuccess();

      console.log('Document written with ID: ', register.id);
    } catch (e) {
      this.popError.openErrorSnackBar(3000, e as string);
    }
  };

  /**Fui Usando para salvar os paises no Firebase Database */
  saveDDIWithPromise = () => {
    try {
      this.mockUpService.fireBaseddiData().forEach((element: IDdi) => {
        const docLocal = doc(db, 'ddi', element.nome);
        const ddi = setDoc(docLocal, element, { merge: true });
      });
    } catch (error) {
      this.popError.openErrorSnackBar(20000, error as string);
    }
  };

  /**Fui Usando para salvar os paises no Firebase Database */
  saveDDIObservable = () => {
    let setLocal;
    this.mockUpService.fireBaseddiData().forEach((element: IDdi) => {
      const docLocal = doc(db, 'ddiObservable', element.fone);
      setLocal = setDoc(docLocal, element, { merge: true });
      from(setLocal);
    });
  };

    getDDI = () => {
    const localCollection = collection(db, 'ddi');
  return  collectionData(localCollection)
      .pipe(
        take(1),
        tap((data: any) => {return this.ddiItem$.next(data), console.log("servicesData ", data)})
      )
      ;
  };
}
