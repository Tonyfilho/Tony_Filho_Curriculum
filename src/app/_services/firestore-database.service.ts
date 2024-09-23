import { inject, Injectable } from "@angular/core";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { IRegister } from "../_models/interface/share-interfaces";
import { DialogService } from "../_share/pop-up/dialog.service";
import { ErrorSnackBarService } from "../_share/pop-up/error-pop-up/error-snack-bar.service";

const firestore = getFirestore();

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {
 popError = inject(ErrorSnackBarService);
 popSuccess = inject(DialogService);

  saveRegister =  (data: IRegister) => {
    const register = doc(firestore, 'register');
    try {
      setDoc(register, data );
      this.popSuccess.openDialogSuccess();

     console.log("Document written with ID: ", register.id);
   } catch (e) {
    this.popError.openErrorSnackBar(3000, e as string);
   }


 }

}
