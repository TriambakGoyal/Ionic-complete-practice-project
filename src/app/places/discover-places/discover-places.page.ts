import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
  isLoading=true
  updatePlaceSubscription: Subscription;
  constructor(
    private placesService:PlacesService,
    private menucontrl:MenuController,
    private authService:AuthService,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {

    this.loadingController.create({
      backdropDismiss:false,
      spinner:'lines',
      keyboardClose:true,
      message:'Loading places'
    }).then(element=>
      {
        element.present();
        this.isLoading=true
        this.placesService.fetchAllPlaces().subscribe(result=>
          {
            this.isLoading=false

            element.dismiss();
          })
        
      });
      
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
  ionViewWillEnter()
  {
    
  }
  onFilterUpdate(event:any){
    console.log(event.detail.value)

    this.authService.userId.pipe(take(1)).subscribe(
      userId =>
      {
        if(event.detail.value=== 'all')
        {
          if(this.loadedPlaces)
          {
            this.recommendePlaces=this.loadedPlaces
    
          }
        }
        else{
          if(this.loadedPlaces)
          {
            this.recommendePlaces = this.loadedPlaces.filter(place=> place.userId !== userId);
    
          }
        }
      }
    )
   
  }
  ngOnDestroy()
  {
    this.updatePlaceSubscription.unsubscribe();
  }

}
