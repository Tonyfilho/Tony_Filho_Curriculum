

export interface IGoogleSignInLocalStore {
  kind:string;
  localId:string;
  email:string;
  displayName: string,
  idToken:string;
  registered?:string;
  refreshToken:string;
  expiresIn: Date;
  avatar?:string;


}
