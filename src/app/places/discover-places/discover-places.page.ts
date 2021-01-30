import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Places } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover-places',
  templateUrl: './discover-places.page.html',
  styleUrls: ['./discover-places.page.scss'],
})
export class DiscoverPlacesPage implements OnInit {

  loadedPlaces:Places[];
  recommendePlaces:Places[];
  updatePlaceSubscription: Subscription;
  constructor(
    private placesService:PlacesService,
    private menucontrl:MenuController,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.loadedPlaces=this.placesService.getAllPlaces();
    this.recommendePlaces=this.loadedPlaces;
    this.updatePlaceSubscription=this.placesService.updatePlaces.subscribe(
      places=>
      {
        this.loadedPlaces=places;
        this.recommendePlaces=this.loadedPlaces
      }
    )


  }
  ionViewDidEnter()
  {
    this.menucontrl.enable(true,'menu1')
    console.log('Discover Did Enter')

  }
  onFilterUpdate(event:any){
    console.log(event.detail.value)
    if(event.detail.value=== 'all')
    {
      this.recommendePlaces=this.loadedPlaces
    }
    else{
      this.recommendePlaces = this.loadedPlaces.filter(place=> place.userId !== this.authService.userId);
    }
  }
  ngOnDestroy()
  {
    this.updatePlaceSubscription.unsubscribe();
  }

}
