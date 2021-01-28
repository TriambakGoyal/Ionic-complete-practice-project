import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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
    private menucontrl:MenuController
    ) { }

  ngOnInit() {
    this.loadedPlaces=this.placesService.getAllPlaces();
  }
  ionViewWillEnter()
  {
    this.menucontrl.enable(true,"menu1")

  }
  ionViewWillLeave()
  {
    this.menucontrl.enable(false,"menu1")

  }

}
