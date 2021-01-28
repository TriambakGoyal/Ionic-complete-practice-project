import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Places } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover-places',
  templateUrl: './discover-places.page.html',
  styleUrls: ['./discover-places.page.scss'],
})
export class DiscoverPlacesPage implements OnInit {

  loadedPlaces:Places[];
  constructor(
    private placesService:PlacesService,
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
