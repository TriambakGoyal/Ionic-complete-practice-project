import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  // ##This should not be used as we are lazy loading so the code of pages will get downloaded but will not be used, so its of no use here
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  //## Service can use other Service by adding constructor

  constructor(
    private authService:AuthService,
    private route:Router
  )
  {

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.userAuthenticated.pipe(take(1),
    switchMap(isAuth=>
      {
        if(!isAuth)
        {
          return this.authService.autoLogin();
        }
        return of(isAuth);
      }),
    tap(isAuth=>
      {
        if(!isAuth)
        {
          this.route.navigateByUrl('/auth')

        }
      }));
  }
}
