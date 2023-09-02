import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import * as Leaflet from 'leaflet';


import 'leaflet-control-geocoder';
import "leaflet-routing-machine";

import {latLng, Marker} from "leaflet";
import { ArchEntry } from '../../model/ArchEntry';
import { ApiRestMapService } from '../../service/api-rest-map.service';
import { MapService } from '../../service/map.service';


Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png'
});
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  map!: Leaflet.Map;
  initialMarkers : ArchEntry[] | undefined;
  markers: Leaflet.Marker[] = [];
  routingControl: Leaflet.Routing.Control | undefined;
  markerRoot: Leaflet.Marker | undefined;
  markersNumber : number | undefined;
  polyline: Leaflet.Polyline | undefined;
  drawPolyline: boolean = false;
  markersToUse: Marker[] = [];


  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 18,
    center: { lat:  35.76455, lng: 10.69758 }
  }
  constructor(public apiRestMapService: ApiRestMapService, public mapService: MapService) { }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  initMarkers() {
    this.apiRestMapService.getAll().subscribe(data => {
      this.initialMarkers = data;

      for (let index = 0; index < this.initialMarkers.length; index++) {

        const element = this.initialMarkers[index];
        const latLangUsed =Leaflet.latLng(element.position.lat, element.position.lan);

        const marker = this.mapService.generateMarker(latLangUsed, index);
        marker.addTo(this.map).bindPopup(`<b>${latLangUsed.lat},  ${latLangUsed.lng}</b>`);
        this.map.panTo(latLangUsed);
        this.markers.push(marker)

      }

    })
  }

  mapClicked($event: any) {
  }

  public togglePolyline(): void {
    if (this.drawPolyline) {
      if (this.polyline) {
        this.map.removeLayer(this.polyline);
      }
    } else {
      if (this.initialMarkers != undefined) {
        const coordinates : Leaflet.LatLngExpression[] = this.initialMarkers.map(entry => [entry.position.lat, entry.position.lan]);
        this.polyline = Leaflet.polyline(coordinates, {color: 'blue'}).addTo(this.map);
      }
    }
    this.drawPolyline = !this.drawPolyline;
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

}
