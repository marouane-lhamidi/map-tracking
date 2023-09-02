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

      const geocoderControl =(Leaflet.Control as any).geocoder().addTo(this.map);
      geocoderControl.on('markgeocode', (event: any) => {
        const location = event.geocode.center;

        if (this.markersNumber == undefined) {
          this.markerRoot = Leaflet.marker(location).addTo(this.map);
          this.markersNumber = 1;
        }else if (this.markersNumber == 1)
        {
          if (this.markerRoot != undefined) {
            const marker: Marker = this.markerRoot;

            this.routingControl = Leaflet.Routing.control({
              waypoints: [
                Leaflet.latLng(marker.getLatLng().lat, marker.getLatLng().lng),
                Leaflet.latLng(location)
              ]
            }).addTo(this.map);
            this.mapService.move(marker, this.routingControl);
          }
          this.markersNumber = 2;

        }else if (this.markersNumber == 2){
          if (this.markerRoot)
            this.map.removeLayer(this.markerRoot);
          if (this.routingControl)
            this.map.removeControl(this.routingControl);
          this.markersNumber = undefined;

        }

      });

    })
  }

  mapClicked($event: any) {
    const marker = Leaflet.marker(Leaflet.latLng($event.latlng.lat, $event.latlng.lng));
    if (this.markersToUse.length == 0) {
      this.markersToUse.push(marker.addTo(this.map) );
    } else if (this.markersToUse.length == 1) {
      this.markersToUse.push(marker.addTo(this.map))
       this.routingControl = Leaflet.Routing.control({
        waypoints: [this.markersToUse[0].getLatLng(), this.markersToUse[1].getLatLng()]
      }).addTo(this.map);
      this.mapService.move(this.markersToUse[0], this.routingControl);

    }else if (this.markersToUse.length == 2){
      this.map.removeLayer(this.markersToUse[0]);
      this.map.removeLayer(this.markersToUse[1]);

      if (this.routingControl)
        this.map.removeControl(this.routingControl);

      this.markersToUse = [];
    }

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
