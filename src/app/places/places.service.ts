import { Injectable } from '@angular/core';
import { Places } from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places:Places[]=[
   new Places(
    'p1',
    'Bhopal',
    'City of Lakes',
    'https://www.icsi.edu/media/filer_public/f4/81/f48141e6-e918-441d-9aeb-da0083fb21ea/lead.jpg',
    500
    ),
    new Places(
      'p2',
      'Bangalore',
      'Silicon Valley of India',
'      https://cms.qz.com/wp-content/uploads/2017/08/bangalore1-reuters-traffic-moves-along-a-road-in-the-southern-indian-city-of-bangalore-december-14-2005.jpg?quality=75&strip=all&w=900&h=900&crop=1'  ,
        1000
      ),
      new Places(
        'p3',
        'Kolkata',
        'Garden City of India',
        'https://cdn.britannica.com/91/110191-050-7BCFD56B/Victoria-Memorial-Hall-Kolkata-India.jpg',
        800
        ),
  ];
  
  constructor() { }

  getAllPlaces()
  {
    return [...this._places]
  }

  getPlace(placeId:string)
  {
    return {...this._places.find(place =>
      {
        return place.id === placeId;
      })}
  }

}
