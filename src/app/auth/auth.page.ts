import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private authService:AuthService,
    private route:Router,
    private menucontrl:MenuController
  ) { }

  ngOnInit() {
  }

  onLogin(){
    this.authService.login();
    this.route.navigateByUrl('/places/discover-places')
  }

  ionViewDidEnter()
  {
    this.menucontrl.enable(false,'menu1')
  }
  ionViewWillLeave()
  {
    this.menucontrl.enable(true,'menu1')
  }
  

}
