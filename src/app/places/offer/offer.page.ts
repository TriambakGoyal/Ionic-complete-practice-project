import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, MenuController } from '@ionic/angular';
import { Places } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  loadedPlaces:Places[];

  constructor(private placesService:PlacesService,
    private menucontrl:MenuController,
    private route:Router
    ) { }

  ngOnInit() {
    this.loadedPlaces=this.placesService.getAllPlaces();
  }
  
  ionViewDidEnter()
  {
    this.menucontrl.enable(true,'menu1')

    console.log('Offer Did Enter')
  }
  
  
  

  onSlide(offerId:string,slider:IonItemSliding)
  {
    slider.close();
    this.route.navigateByUrl('/places/offer/edit-offer/'+offerId);

  }

}
