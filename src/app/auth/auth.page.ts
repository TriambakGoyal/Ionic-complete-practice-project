import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { element } from 'protractor';
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
    private menucontrl:MenuController,
    private loadingContoller:LoadingController
  ) { }

  ngOnInit() {
  }

  onLogin(){
    this.authService.login();
    this.loadingContoller.create({
      message:"Logging In...",
      spinner:'lines',
      keyboardClose:true
    }).then(ele=>
      {
        ele.present();
        setTimeout(()=>
        {
          ele.dismiss();
          this.route.navigateByUrl('/places/discover-places')
        },1500);
      });
   
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
