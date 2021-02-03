import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController, MenuController } from '@ionic/angular';
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
  isLoading=true
  bookSubscription:Subscription;

  constructor(
    private bookingService:BookingsService,
    private menucontrl:MenuController,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    this.bookSubscription=this.bookingService.allBookings.subscribe(bookings =>
      {
        this.loadedBooking=bookings
      })
  }
  ionViewWillEnter(){
    this.bookingService.fetchAllBookings().subscribe(
      ()=> this.isLoading=false
    );
  }
  ionViewDidEnter()
  {
    this.menucontrl.enable(true,'menu1')
    console.log('Booking Will Enter')
  }

  onDelete(bookingId:string,slider:IonItemSliding)
  {
    slider.close();

    this.loadingController.create(
      {
        backdropDismiss:false,
        keyboardClose:true,
        spinner:'lines',
        message:'Please wait while we cancel your booking....'
      }
    ).then(
      ele=>
      {
        ele.present();
        this.bookingService.delete_booking(bookingId).subscribe(
          ()=>
          {
            ele.dismiss();
          });
    }
    )
    
  }

  ngOnDestroy()
  {
    this.bookSubscription.unsubscribe();
  }

}
