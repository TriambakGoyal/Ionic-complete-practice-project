import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Capacitor, Plugins} from '@capacitor/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{

  private sub:Subscription;
  private previousAuthState=false;
  constructor(
    private platform: Platform,
    private authService:AuthService,
    private route:Router
  ) {
    this.initializeApp();
  }

  ngOnInit()
  {
    this.sub=this.authService.userAuthenticated.subscribe(
      isAuth=>
      {
        if(!isAuth && this.previousAuthState !== isAuth)
        {
          this.route.navigateByUrl('/auth')
        }
        this.previousAuthState = isAuth
      }
    )
  }
  initializeApp() {
    this.platform.ready().then(() => {
    
      if(Capacitor.isPluginAvailable('SplashScreen'))
      {
        Plugins.SplashScreen.hide();
      }
    });
  }
  onLogout()
  {
    this.authService.logout();
  }

  ngOnDestroy()
  {
    if(this.sub)
    {
      this.sub.unsubscribe();
    }
  }
}
