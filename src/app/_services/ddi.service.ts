import { inject, Injectable } from "@angular/core";
import { UnSubscription } from "../_share/UnSubscription";
import { HttpClient } from "@angular/common/http";

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
    return this.httpService.get<any>(`https://servicodados.ibge.gov.br/api/v1/paises/${'BR'}`);


  }

}
