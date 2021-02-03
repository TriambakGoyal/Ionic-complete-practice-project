import { error } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Places } from '../../places.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.page.html',
  styleUrls: ['./edit-offers.page.scss'],
})
export class EditOffersPage implements OnInit,OnDestroy {

  loadedPlace:Places;
  form:FormGroup;
  Count=0;
  isLoading=true;
  places:Subscription;
  constructor(private activatedRoute:ActivatedRoute,
    private placeService:PlacesService,
    private route:Router,
    private loadingController:LoadingController,
    private alertController:AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap=>
      {
        if(!paramMap.has('placeId'))
        {
          this.route.navigateByUrl('/places/offer');
          return
        }

        const placeId=paramMap.get('placeId');

        // this.isLoading=true
        // this.loadedPlace=this.placeService.getPlace(placeId)

        // console.log(this.placeService.getPlace(placeId))

        //Subscribe can have a second argument which shows erroe if the link is broken
        this.places=this.placeService.getSinglePlace(placeId).subscribe(
          result => 
          {
            this.loadedPlace=result;
            this.form= new FormGroup(
              {
                title: new FormControl(this.loadedPlace.name,
                  {
                    updateOn:'blur',
                    validators:[Validators.required]
                  }
                ),
                description:new FormControl(this.loadedPlace.desc,
                  {
                    updateOn:'change',
                    validators:[Validators.required,Validators.maxLength(180)]
                  }
                )
              }
            );
            this.Count=this.loadedPlace.desc.length;
            this.isLoading=false;
           
          },
          error=>{
            this.alertController.create({
              header:"An Error occurred",
              message:"Place could not be fetched. Please try again later...",
              buttons:[{
                text:'Okay',
                handler:()=>
                {
                  this.route.navigateByUrl('places/offer')

                }
              }]
            }).then(alert=>
              {
                alert.present()
              })
          }
        )        
     

      }
    )
    
  }

  charCount()
  {
    this.Count=this.form.get('description').value.length;
  }

  ionViewWillEnter()
{
  this.placeService.fetchAllPlaces().subscribe()
}
  onEditOffer()
  {
    this.loadingController.create(
      {
        backdropDismiss:false,
        message:'Updating...',
        spinner:'lines',
        'keyboardClose':true
      }
    ).then(
      element =>
      {
        element.present();
        this.placeService.UpdateInfoPlace(
          this.loadedPlace.id,
          this.form.value.title,
          this.form.value.description).subscribe(
            ()=> {
              element.dismiss()
              this.route.navigateByUrl('/places/offer')
    
            }
          );
      }
    )
    
    
  }
  ngOnDestroy(){
    this.places.unsubscribe();
  }
}
