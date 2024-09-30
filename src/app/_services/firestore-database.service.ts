import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { inject, Injectable } from "@angular/core";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { from, Observable } from "rxjs";
import { IDdi, IRegister } from "../_models/interface/share-interfaces";
import { DialogService } from "../_share/pop-up/dialog.service";
import { ErrorSnackBarService } from "../_share/pop-up/error-pop-up/error-snack-bar.service";
import { CountryCodesService } from "./mock-up/CountryCodes.service";


const db = getFirestore();

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {
  private popError = inject(ErrorSnackBarService);
  private popSuccess = inject(DialogService);
  private mockUpService = inject(CountryCodesService);
  private ddiItemsCollection!: AngularFirestoreCollection<IDdi>;
  
  iDdiItems$!: Observable<IDdi[]>;

  // constructor(private afs: AngularFirestore) {
  //   this.itemsCollection = afs.collection<IDdi>('ddi'); // Replace 'items' with your collection name
  //   this.items = this.itemsCollection.valueChanges();
  // }


  saveRegister = (data: IRegister) => {
    const register = doc(db, 'register', data.phone);
    try {
      setDoc(register, data);
      this.popSuccess.openDialogSuccess();

      console.log("Document written with ID: ", register.id);
    } catch (e) {
      this.popError.openErrorSnackBar(3000, e as string);
    }
  }

/**Fui Usando para salvar os paises no Firebase Database */
saveddiWithPromise = () => {
  try {
    this.mockUpService.fireBaseddiData().forEach((element: IDdi) => {
      const docLocal = doc(db, 'ddi', element.nome);
      const ddi = setDoc(docLocal, element, { merge: true });
    });
  } catch (error) {
    this.popError.openErrorSnackBar(20000, error as string);
  }
}


/**Fui Usando para salvar os paises no Firebase Database */
  saveDDIObservable = () => {
    let setLocal;
    this.mockUpService.fireBaseddiData().forEach((element: IDdi) => {
      const docLocal = doc(db, 'ddiObservable', element.fone);
     setLocal = setDoc(docLocal, element, { merge: true });
     from(setLocal);

    });

  }




}
