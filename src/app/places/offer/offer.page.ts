import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Places } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit, OnDestroy {

  loadedPlaces:Places[];

  updatePlaceSubscription:Subscription;

  constructor(private placesService:PlacesService,
    private menucontrl:MenuController,
    private route:Router,
    private authService:AuthService
    ) { }

  ngOnInit() {
    this.loadedPlaces=this.placesService.getAllPlaces().filter(place=>
      {
        return place.userId == this.authService.userId
      });
    this.updatePlaceSubscription=this.placesService.updatePlaces.subscribe(
      places=>
      {
        this.loadedPlaces=places.filter(place=>
          {
            return place.userId == this.authService.userId
          });
      }
    )
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
  ngOnDestroy()
  {
    this.updatePlaceSubscription.unsubscribe();
  }

}
