

export interface IGoogleToken {
  kind: string;
  localId: string;
  email: string;
  displayName: string,
  idToken: string;
  registered?: string;
  refreshToken: string;
  expiresIn: Date;
  avatar?: string;


}
export interface IRegister {

  avatar: string;
  companyName: string;
  country: string;
  displayName: string,
  email: string;
  password: string;
  phone: string;

}
export interface IDdi {

  codigo: string;
  fone: string;
  iso: string;
  iso3: string;
  nome: string;
  nomeFormal: string;

}
export interface IDdiEN {  
  name: string;
  phone: string;
  code?: string;
  iso?: string;
  iso3?: string;
  formalName?: string;

}



