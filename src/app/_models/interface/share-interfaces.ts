

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

  avatar?: string;
  companyName?: string;
  country?: string;
  displayName: string,
  email: string;
  password: string;
  phone?: string;

}
