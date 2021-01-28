import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Places } from '../../places.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-booking',
  templateUrl: './offer-booking.page.html',
  styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit {

  place:Places;

  constructor(
    private activatedRoute:ActivatedRoute,
    private navcontrl:NavController,
    private placeService:PlacesService
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(
      parmap=>{
        if(!parmap.has('placeId'))
        {
          this.navcontrl.navigateBack('/places/offer');
          return;
        }
        const placeId=parmap.get('placeId')
        this.place=this.placeService.getPlace(placeId);
      }
    )

  }

}
