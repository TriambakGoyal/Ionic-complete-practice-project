import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userAuthenticated=true;
  private _userId='abc'

  constructor() { }
  
  get userId()
  {
    return this._userId
  }

  get userAuthenticate()
  {
    return this._userAuthenticated;
  }

  login()
  {
    this._userAuthenticated=true;
  }
  logout()
  {
    this._userAuthenticated=false;
  }
}
