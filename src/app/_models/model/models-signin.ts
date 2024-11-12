import { IGoogleToken, IRegister } from '../interface/share-interfaces';

export class ModelTokenResponse implements IGoogleToken {
  email: string;
  kind: string;
  localId: string;
  displayName: string;
  idToken: string;
  registered?: string | undefined;
  refreshToken: string;
  expiresIn: Date;
  avatar?: string | undefined;

  constructor(
    email: string,
    kind: string,
    localId: string,
    displayName: string,
    idToken: string,
    refreshToken: string,
    expiresIn: Date,
    avatar: string
  ) {
    this.email = email;
    this.kind = kind;
    this.localId = localId;
    this.displayName = displayName;
    this.idToken = idToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.avatar = avatar;
  }
}
export class ModelRegister implements IRegister {
  gender: string;
  avatar: string;
  companyName: string;
  country: string;
  displayName: string;
  email: string;
  password: string;
  phone: string;

  constructor(
    gender: string,
    avatar: string,
    companyName: string,
    country: string,
    displayName: string,
    email: string,
    password: string,
    phone: string
  ) {
    this.gender = gender;
    this.avatar = avatar;
    this.companyName = companyName;
    this.country = country;
    this.displayName = displayName;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }

  
}
