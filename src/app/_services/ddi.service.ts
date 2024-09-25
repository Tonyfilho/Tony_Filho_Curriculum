import { inject, Injectable } from "@angular/core";
import { UnSubscription } from "../_share/UnSubscription";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";


type ddi = {
  id: number;
  indicador: string;
  unidade: {
    id: string;
    classe: string;
    multiplicador: number;
  }

}


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
   // return this.httpService.get<any>(`https://servicodados.ibge.gov.br/api/v1/paises/${'BR'}`);
    return this.httpService.get<any>(`https://servicodados.ibge.gov.br/api/v1/paises/{paises}`).pipe(map(result => {
  //  return result[0].id

    //  for (const key in result) {

    //     const element = result[key];
    //     return element.id['ISO-3166-1-ALPHA-2'];


    // }
    for (const key in result) {

        localId.push(result[key].id['ISO-3166-1-ALPHA-2']);


      }
      return localId;
 //  return result.forEach((element: any) => element)

    }));



  }

}
