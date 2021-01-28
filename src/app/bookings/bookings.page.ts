import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from './bookings.model';
import { BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy{

  loadedBooking:Booking[];

  bookSubscription:Subscription;

  constructor(
    private bookingService:BookingsService,
    private menucontrl:MenuController
  ) { }

  ngOnInit() {
    this.loadedBooking=this.bookingService.allBookings

    this.bookSubscription=this.bookingService.bookingChange.subscribe(
      booking=>
      {
        this.loadedBooking=booking;
      }
    )
  }
  ionViewDidEnter()
  {
    this.menucontrl.enable(true,'menu1')
    console.log('Booking Will Enter')
  }

  onDelete(bookingId:string,slider:IonItemSliding)
  {
    slider.close();

    this.bookingService.delete_booking(bookingId);
  }

  ngOnDestroy()
  {
    this.bookSubscription.unsubscribe();
  }

}
