import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscoverPlacesPage } from './discover-places.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverPlacesPage,

     
  },
  {
    path: ':placeId',
    loadChildren: () => import('./places-details/places-details.module').then( m => m.PlacesDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverPlacesPageRoutingModule {}
