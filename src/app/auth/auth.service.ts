import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { from } from 'rxjs';
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
export class AuthService implements OnDestroy{

  private _user=new BehaviorSubject<User>(null);
  private activeTimer:any;
  
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
  get token()
  {
    return this._user.asObservable().pipe(
      map(
        user =>
        {
          if(user)
          {
            return user.token
          }
          else{
            return null
          }
        }
      )
    )
  }

  autoLogin()
  {
   
    //from takes a promise and converts it into an observable
    return from(Plugins.Storage.get({key:'authData'})).pipe(
      map(storedData=>
        {
          if(!storedData || !storedData.value)
          {
            return null
          }

          const parseData=JSON.parse(storedData.value) as {
            userId:string,
            token:string,
            tokeneExpireDate:string,
            email:string
          };

          const expirationTime=new Date(parseData.tokeneExpireDate);
          if(expirationTime <= new Date() )
          {
            return null
          }

          const user = new User(
            parseData.userId,
            parseData.email,
            parseData.token,
            expirationTime
          )
          return user
        }),
        tap(user=>
          {
            if(user)
            {
              this._user.next(user)
              this.autoLogout(user.tokenDuration)
            }
          }),
          map(
            user=>{
              return !!user;
            }
          )
    )
  }

  //Call this method where user log-in or sign-up or autologin
  private autoLogout(duration:number)
  {
    if(this.activeTimer)
    {
      clearTimeout(this.activeTimer)
    }
    //to clear timer
       this.activeTimer=setTimeout(()=>
      {
        this.logout()
      },duration)
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
    if(this.activeTimer)
    {
      clearTimeout(this.activeTimer)
    }
    this._user.next(null)
    Plugins.Storage.remove({key:'authData'})
  }

  ngOnDestroy()
  {
    if(this.activeTimer)
    {
      clearTimeout(this.activeTimer)
    }

  }

  private setUserData(resData:AuthResponseData)
  {
        // getTime date in milli second
        // + is added as prefix to convert it into number
        // but we need date format so we wrap in new Date
        // Expiration time we get in seconds so to convert we multiply it to 1000
        const expiratonTime= new Date(new Date().getTime()+ +resData.expiresIn * 1000);
        
        const user=new User(
          resData.localId,
          resData.email,
          resData.idToken,
          expiratonTime
          )
        this._user.next(user);
          this.autoLogout(user.tokenDuration)

          this.storeAuth(resData.localId
          ,resData.idToken,
            expiratonTime.toISOString(),
            resData.email)
  }
  private storeAuth(
    userId:string,
    token:string,
    tokeneExpireDate:string,
    email:string
  )
  {
    // wrapping the contents in json object and making it a string
    const data= JSON.stringify({userId:userId,
    token:token,
    tokeneExpireDate:tokeneExpireDate,
    email});

    Plugins.Storage.set({key:"authData",value:data});
  }
}
