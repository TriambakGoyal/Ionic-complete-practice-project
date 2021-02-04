import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingsService } from 'src/app/bookings/bookings.service';
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
  isLoading=true;
  userId:string;
  constructor(
    private activatedRoute:ActivatedRoute,
    private placeService:PlacesService,
    private route:Router,
    private modelController:ModalController,
    private authService:AuthService,
    private alertController:AlertController,
    private bookingService:BookingsService
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
      let fetchUserId:string;
      // this.loadedPlace= this.placeService.getPlace(placeId)
      this.authService.userId.pipe(take(1),
        switchMap(
          userId =>
          {
            if(!userId)
            {
              throw new Error("No User id found")
            }
            fetchUserId=userId
            return this.placeService.getSinglePlace(placeId)

          }
        )
      ).subscribe(
        result =>
        {
          this.loadedPlace=result;
          this.isLoading=false;
          this.userId=fetchUserId
        },
        error=>
        {
          this.alertController.create(
            {
              message:"An Error occurred!",
              buttons:[{
                text:"Okay",
                handler:()=>
                {
                  this.route.navigateByUrl('places/discover-places')
                }
              }]
            }
          )
        }
      )
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
