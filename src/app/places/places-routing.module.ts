import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesPage,
    children:[
      {
        path: 'discover-places',
        loadChildren: () => import('./discover-places/discover-places.module').then( m => m.DiscoverPlacesPageModule), 
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then( m => m.OfferPageModule)
      },
      {
        path:'',
        redirectTo:'/places/discover-places/',
        pathMatch:'full'
      }
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
