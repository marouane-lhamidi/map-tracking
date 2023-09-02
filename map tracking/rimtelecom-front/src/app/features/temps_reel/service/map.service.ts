import { Injectable } from '@angular/core';
import { Marker } from 'leaflet';
import * as Leaflet from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  move(marker: Marker, routingControl: Leaflet.Routing.Control){
    if (routingControl)
    routingControl.on('routesfound', (event: any) => {
      event.routes[0].coordinates.forEach(function(coord: Leaflet.LatLng, index: number) {
        setTimeout(() => {
          marker.setLatLng([coord.lat, coord.lng]);
        }, 100 * index);
      });
    });
  }
  generateMarker(data: any, index: number) {
    return Leaflet.marker({ lat: data.lat, lng: data.lng }, {
      draggable: data.draggable
    })
/*     
    .on('click', (event) => this.markerClicked(event, index))
    .on('dragend', (event) => this.markerDragEnd(event, index));;
 */ 
  }
}
