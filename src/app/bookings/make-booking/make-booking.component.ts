import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Places } from 'src/app/places/places.model';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.scss'],
})
export class MakeBookingComponent implements OnInit {

  @Input() selectedPlace:Places;
  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  onDismiss()
  {
      this.modalController.dismiss(null,'cancel')
  }
  onBookPlace()
  {
      this.modalController.dismiss({message:'Congratulations!! You have booked the Place'},'confirm')
  }

}
