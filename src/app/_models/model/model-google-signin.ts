import { IGoogleToken } from '../interface/google-token';



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


  constructor(email: string, kind: string, localId:string, displayName:string, idToken:string, refreshToken
    :string, expiresIn: Date, avatar: string
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
