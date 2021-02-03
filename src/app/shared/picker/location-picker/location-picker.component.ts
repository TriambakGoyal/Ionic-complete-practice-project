import { Component, OnInit } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(
    private alerController:AlertController
  ) { }

  ngOnInit() {}

  getLocation()
  {
     if(!Capacitor.isPluginAvailable('Geolocation'))
     {
       this.showAlert();
        return
     }  
     
     Plugins.Geolocation.getCurrentPosition()
     .then(geoPosition=>
      {
        console.log(geoPosition)
      })
     .catch(err=>
      {
        this.showAlert();
      })
  }                                                                                                                                                                             

  private showAlert()
  {
    this.alerController.create(
      {
        header:"Error Occurred!",
        message:"Could Not fetch location...",
        backdropDismiss:true
      }
    ).then(ele=>
     {
       ele.present()
     })
  }
}                                                                                                           
