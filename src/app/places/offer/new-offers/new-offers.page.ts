import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.page.html',
  styleUrls: ['./new-offers.page.scss'],
})
export class NewOffersPage implements OnInit {

  form:FormGroup;
  Count=0;
  constructor(private placeService:PlacesService,
    private route:Router,
    private loadingController:LoadingController) {
   }

  ngOnInit() {

    this.form= new FormGroup(
      {
        title: new FormControl(null,
          {
            updateOn:'blur',
            validators:[Validators.required]
          }
        ),
        description:new FormControl(null,
          {
            updateOn:'change',
            validators:[Validators.required,Validators.maxLength(180)]
          }
        ),
        price:new FormControl(null,
          {
            updateOn:'blur',
            validators:[Validators.required,Validators.min(1)]
          }
        ),
        datefrom:new FormControl(null,
          {
            updateOn:'blur',
            validators:[Validators.required]
          }
        ),
        dateto:new FormControl(null,
          {
            updateOn:'blur',
            validators:[Validators.required]
          }
        )

      }
    )
  }
  onCreateOffer(){
    
    if(this.form.invalid)
    {
      return;
    }

    this.placeService.addPlace(
      this.form.get('title').value,
      this.form.get('description').value,
      this.form.get('price').value,
      this.form.get('datefrom').value,
      this.form.get('dateto').value,
    )
    this.loadingController.create({
      spinner:'lines',
      keyboardClose:true,
      message:'Creating the offer',
      backdropDismiss:false
    }).then(element=>
      {
        element.present();
        setTimeout(()=>
        {
          element.dismiss();
          this.route.navigateByUrl('/places/offer')
        },1500);
      })
     }

  charCount()
  {
    this.Count=this.form.get('description').value.length;
    console.log(this.Count)
  }

}
