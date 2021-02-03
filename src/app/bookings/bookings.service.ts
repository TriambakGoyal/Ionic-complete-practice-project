import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Booking } from './bookings.model';

interface BookingData{
  dateFrom: string;
dateTo: string;
guestNumber: number;
placeId: string;
placeImgUrl: string;
placeName: string;
userId: string;
userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private _bookings=new BehaviorSubject<Booking[]>([]);

  constructor(
    private authService:AuthService,
    private http:HttpClient
  ) { }

  get allBookings()
  {
    return this._bookings.asObservable();
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
    let genId:string;
    const newBooking = new Booking(
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

    return this.http.post<{name:string}>('https://nimble-service-290818-default-rtdb.firebaseio.com/bookings.json',
    {...newBooking,id:null}).pipe(
      switchMap(resData =>
        {
          genId=resData.name;
          return this._bookings
        }),
        //We have to add take(1) as we don't want ongoing subscription we want it for only one time
        take(1),
        tap(bookings=>
          {
            newBooking.id=genId;
            this._bookings.next(bookings.concat(newBooking))
          })
    );
  }
 

  fetchAllBookings()
  {
    //orderBy="userId"&equalTo="${} ==> this is a firebase feature and says that order the list by userId where userId is equal to authenticate User Id"
    // We also need to set some settings in the firebase
    return this.http.get<{[key:string]:BookingData}>(`https://nimble-service-290818-default-rtdb.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`)
    .pipe(
      map(bookingData=>
        {
          const bookings=[];

          for(const key in bookingData)
          {
            if(bookingData.hasOwnProperty(key))
            {
              bookings.push(
                new Booking(
                  key,
                  bookingData[key].placeId,
                  bookingData[key].userId,
                  bookingData[key].placeName,
                  bookingData[key].placeImgUrl,
                  bookingData[key].guestNumber,
                  bookingData[key].userName,
                  new Date(bookingData[key].dateFrom),
                  new Date(bookingData[key].dateTo)
                )
              )
            }
          }
          return bookings
        }),tap(
          bookings=>
          {
            this._bookings.next(bookings);
          }
        )

    )
  }

   delete_booking(bookId:string)
  {
    return this.http.delete(`https://nimble-service-290818-default-rtdb.firebaseio.com/bookings/${bookId}.json`).pipe(
      switchMap(()=>
      {
        return this._bookings;
      }),take(1),
      tap(bookings =>{
        this._bookings.next(bookings.filter(b=>b.id!==bookId));
      })
    )
  }

}
