import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Booking } from './bookings.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  public bookingChange = new Subject<Booking[]>();

  private _bookings:Booking[]=[
    {
      id:'b1',
      placeId:'p4',
      userId:'u1',
      placeName:'New York',
      guestNumber:5
    },
    {
      id:'b2',
      placeId:'p5',
      userId:'u1',
      placeName:'Britain',
      guestNumber:4
    },
    {
      id:'b3',
      placeId:'p6',
      userId:'u1',
      placeName:'Hyderabad',
      guestNumber:2
    }
  ];
  constructor() { }

  get allBookings()
  {
    return [...this._bookings]
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
