import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {environment} from '../../environments/environment'
import { User } from './user.model';

export interface AuthResponseData{
  idToken:	string,
  email:	string,
  refreshToken:	string,
  expiresIn:	string,
  localId:	string,
  registered?: boolean // ? it indicates an optional field
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user=new BehaviorSubject<User>(null);
  
  constructor(private http:HttpClient) { }
  
  get userAuthenticated()
  {
      return this._user.asObservable().pipe(
        map(user=> {
          if(user)
          {
            return !!user.token
          }
          else{
            return false
          }
          
        }))
        // double !! force the output to boolean
  }
  

  get userId()
  {
    return this._user.asObservable().pipe(
      map(
        user =>
        {
          if(user)
          {
            return user.id
          }
          else{
            return null
          }
        }
      )
    )
  }

  signup(email:string,password:string){

    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.WEB_API}`,
    {email:email,password:password,returnSecureToken:true})
    .pipe(tap(this.setUserData.bind(this)));
    //bind to let it know that it is a method of this class not of tap
    // this automatically sends response
  }


  login(email:string,password:string)
  {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.WEB_API}`,
    {email:email,password:password,returnSecureToken:true})
    .pipe(tap(this.setUserData.bind(this)));

  }
  
  logout()
  {
    this._user.next(null)
  }

  private setUserData(resData:AuthResponseData)
  {
  
        // getTime date in milli second
        // + is added as prefix to convert it into number
        // but we need date format so we wrap in new Date
        // Expiration time we get in seconds so to convert we multiply it to 1000
        const expiratonTime= new Date(new Date().getTime()+ +resData.expiresIn * 1000);
        
        this._user.next(new User(
          resData.localId,
          resData.email,
          resData.idToken,
          expiratonTime
          ));
  }
}
