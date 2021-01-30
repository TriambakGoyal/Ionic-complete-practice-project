import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Booking } from './bookings.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  public bookingChange = new Subject<Booking[]>();

  private _bookings:Booking[]=[];

  constructor(
    private authService:AuthService
  ) { }

  get allBookings()
  {
    return [...this._bookings]
  }

  addBooking(
    placeId:string,
    placeName:string,
    placeImgUrl:string,
    guestNumber:number,
    userName:string,
    dateFrom:Date,
    dateTo:Date
  )
  {
    const booking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeName,
      placeImgUrl,
      guestNumber,
      userName,
      dateFrom,
      dateTo
    )
    this._bookings.push(booking);
    this.bookingChange.next(this._bookings);
  }
  delete_booking(bookId:string)
  {
    this._bookings=this._bookings.filter(element=>
      {
        return bookId !== element.id
      })
      this.bookingChange.next(this._bookings);
  }
}
