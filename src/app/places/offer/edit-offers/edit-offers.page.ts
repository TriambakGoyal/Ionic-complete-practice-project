import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Places } from '../../places.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.page.html',
  styleUrls: ['./edit-offers.page.scss'],
})
export class EditOffersPage implements OnInit {

  loadedPlace:Places;
  form:FormGroup;
  Count=0;
  constructor(private activatedRoute:ActivatedRoute,
    private placeService:PlacesService,
    private route:Router,) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap=>
      {
        if(!paramMap.has('placeId'))
        {
          this.route.navigateByUrl('/places/offer')
          return
        }
        const placeId=paramMap.get('placeId')
        this.loadedPlace=this.placeService.getPlace(placeId);
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
        )
        this.Count=this.form.get('description').value.length;

      }
    )
    
  }

  charCount()
  {
    this.Count=this.form.get('description').value.length;
    console.log(this.Count)
  }

  onEditOffer()
  {
    
  }
}
