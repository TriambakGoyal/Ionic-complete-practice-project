import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferPage } from './offer.page';

const routes: Routes = [
  {
    path: '',
    component: OfferPage,
  },
  {
    path: 'new-offers',
    loadChildren: () => import('./new-offers/new-offers.module').then( m => m.NewOffersPageModule)
  },
  {
    path: 'edit-offer/:placeId',
    loadChildren: () => import('./edit-offers/edit-offers.module').then( m => m.EditOffersPageModule)
  },
  {
    path: ':placeId',
    loadChildren: () => import('./offer-booking/offer-booking.module').then( m => m.OfferBookingPageModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferPageRoutingModule {}
