import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.page.html',
  styleUrls: ['./new-offers.page.scss'],
})
export class NewOffersPage implements OnInit {

  form:FormGroup;
  Count=0;
  constructor() {
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
    console.log('Created')
  }
  charCount()
  {
    this.Count=this.form.get('description').value.length;
    console.log(this.Count)
  }

}
