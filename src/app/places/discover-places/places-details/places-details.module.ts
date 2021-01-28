import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesDetailsPageRoutingModule } from './places-details-routing.module';

import { PlacesDetailsPage } from './places-details.page';
import { MakeBookingComponent } from '../../../bookings/make-booking/make-booking.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesDetailsPageRoutingModule
  ],
  declarations: [PlacesDetailsPage,MakeBookingComponent ],
  entryComponents:[MakeBookingComponent]
})
export class PlacesDetailsPageModule {}
