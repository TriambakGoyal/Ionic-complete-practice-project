import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

 isLogin=true; 

 isLoading=false;
  constructor(
    private authService:AuthService,
    private route:Router,
    private menucontrl:MenuController,
    private loadingContoller:LoadingController,
    private alertController:AlertController
  ) { }

  ngOnInit() {
  }

  authenticate(email:string,password:string){
    this.isLoading=true
    this.loadingContoller.create({
      message:"Logging In...",
      spinner:'lines',
      keyboardClose:true
    }).then(ele=>
      {
        ele.present();

        let authOb:Observable<AuthResponseData>
        if(this.isLoading)
        {
          authOb=this.authService.login(email,password)
        }
        else{
          authOb=this.authService.signup(email,password)

        }
        authOb.subscribe(
          resData=>
          {
            console.log(resData)
            this.isLoading=false
            ele.dismiss()
            this.route.navigateByUrl('/places/discover-places')

          },
          errorRes=>
          {
            this.isLoading=false
            ele.dismiss()
            this.showAlert(errorRes.error.error.message)
          }
        )
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
  onSwitchMode()
  {
    this.isLogin=!this.isLogin;
  }
  
onSubmit(form:NgForm)
{
  if(form.invalid)
  {
    return;
  }
  const email= form.value.email
  const password= form.value.password
  console.log(form)

  this.authenticate(email,password)
}

private showAlert(message:string){

    this.alertController.create(
      {
        header:"Authentication Failed",
        message:message,
        buttons:['Okay']
      }
    ).then(
      ele=> ele.present()
    )
}
}
