import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Capacitor, Plugins} from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService:AuthService,
    private route:Router
  ) {
    this.initializeApp();
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
    this.route.navigateByUrl('/auth')
  }
}
