import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { UnSubscription } from "../_share/UnSubscription";


type ddi = {
  id: number;
  indicador: string;
  unidade: {
    id: string;
    classe: string;
    multiplicador: number;
  }

}


/**
 * 
 * @returns Não usando, copiamos todo o conteudo e salvamos no Firebase DataBase e estamos usando fireStoreDatabaseServices
 */
@Injectable({
  providedIn: 'root'
})
export class DDIService extends UnSubscription {
  // httpService = inject(HttpClient);
  constructor(private httpService: HttpClient ) {
    super();
  }
  getDDI = () => {
    const localId: any[] = [];
    return this.httpService.get<any>(`https://servicodados.ibge.gov.br/api/v1/paises/{paises}`).pipe(map(result => {

    for (const key in result) {
        localId.push(result[key].id['ISO-3166-1-ALPHA-3']);
      }
      return localId;

    }));

  }

}
