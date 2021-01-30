import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { MakeBookingComponent } from '../../../bookings/make-booking/make-booking.component';
import { Places } from '../../places.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-places-details',
  templateUrl: './places-details.page.html',
  styleUrls: ['./places-details.page.scss'],
})
export class PlacesDetailsPage implements OnInit {

  loadedPlace:Places;
  userId:string;
  constructor(
    private activatedRoute:ActivatedRoute,
    private placeService:PlacesService,
    private route:Router,
    private modelController:ModalController,
    private authService:AuthService
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(
      paramMap=>
      {
        if(!paramMap.has('placeId'))
        {
          this.route.navigateByUrl('/places/discover-places')
          return
        }
        const placeId=paramMap.get('placeId')
        this.loadedPlace=this.placeService.getPlace(placeId);
        this.userId=this.authService.userId
      }
    )
  }
  onBook(){
    this.modelController.create({
      component:MakeBookingComponent,
      componentProps:{
        selectedPlace:this.loadedPlace
      }
    }).then(modelEle=>
      {
        modelEle.present();
        return modelEle.onDidDismiss();
      })
      .then(return_result=>
        {
            console.log(return_result.data," ",return_result.role)
        })
  }

}
