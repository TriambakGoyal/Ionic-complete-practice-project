import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
  isLoading=false
  updatePlaceSubscription:Subscription;

  constructor(private placesService:PlacesService,
    private menucontrl:MenuController,
    private route:Router,
    private authService:AuthService
    ) { }

  ngOnInit() {
    let UserId:string;
    this.authService.userId.pipe(take(1)).subscribe(
      userId=>
      {
        if(!userId)
        {
          throw new Error("No User id")
        }
        UserId=userId
        this.loadedPlaces=this.placesService.getAllPlaces().filter(place=>
          {
            return place.userId == userId
          });
      }
     
    )
   

    this.updatePlaceSubscription=this.placesService.updatePlaces.subscribe(
      places=>
      {
        this.loadedPlaces=places.filter(place=>
          {
            return place.userId == UserId
          });
      }
    )
  }
  
  ionViewDidEnter()
  {
    this.menucontrl.enable(true,'menu1')
    console.log('Offer Did Enter')
    
  }
  ionViewWillEnter()
  {   
    this.isLoading=true
    this.placesService.fetchAllPlaces().subscribe(()=>
    {
      this.isLoading=false;
    })
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
