import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Places } from 'src/app/places/places.model';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.scss'],
})
export class MakeBookingComponent implements OnInit {

  @Input() selectedPlace:Places;

  // To get any local Element from the html file
  @ViewChild('form',{static:true}) form:NgForm;

  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  onDismiss()
  {
      this.modalController.dismiss(null,'cancel')
  }
  onBookPlace(form:any)
  {
      this.modalController.dismiss({message:'Congratulations!! You have booked the Place',
    bookingData:{
      Name:this.form.value['name'],
      Guest:this.form.value['guests'],
      from:this.form.value['bookfrom'],
      to:this.form.value['bookto']
    }},'confirm')
  }

  dateValid()
  {
    const startDate= new Date(this.form.value['bookfrom'])
    const endDate= new Date(this.form.value['bookto'])

    return startDate < endDate;
  }

}
