import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import * as Leaflet from 'leaflet';
import {MapService} from "../service/map.service";
import {ArchEntry} from "../model/ArchEntry";

import 'leaflet-control-geocoder';
import "leaflet-routing-machine";

import {Marker} from "leaflet";


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


  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 18,
    center: { lat:  35.76455, lng: 10.69758 }
  }
  constructor(private mapService: MapService) { }

  initMarkers() {
    this.mapService.getAll().subscribe(data => {
      this.initialMarkers = data;

      for (let index = 0; index < this.initialMarkers.length; index++) {
        const element = this.initialMarkers[index];
        const marker = this.generateMarker(element, index);
        marker.addTo(this.map).bindPopup(`<b>${element.position.lat},  ${element.position.lan}</b>`);
        this.map.panTo([element.position.lat, element.position.lan]);
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
            this.animate(marker);
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
  generateMarker(data: any, index: number) {
    return Leaflet.marker({ lat: data.position.lat, lng: data.position.lan }, {
      draggable: data.draggable
    })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
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


  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    if (this.markersNumber == undefined) {
      this.markerRoot = Leaflet.marker([$event.latlng.lat, $event.latlng.lng]).addTo(this.map);
      this.markersNumber = 1;
    }else if (this.markersNumber == 1)
    {
      if (this.markerRoot != undefined) {
        const marker: Marker = this.markerRoot;

         this.routingControl = Leaflet.Routing.control({
          waypoints: [
            Leaflet.latLng(marker.getLatLng().lat, marker.getLatLng().lng),
            Leaflet.latLng($event.latlng.lat, $event.latlng.lng)
          ]
        }).addTo(this.map);
        this.animate(marker);
      }
      this.markersNumber = 2;

    }else if (this.markersNumber == 2){
      if (this.markerRoot)
        this.map.removeLayer(this.markerRoot);
      if (this.routingControl)
        this.map.removeControl(this.routingControl);
      this.markersNumber = undefined;

    }


  }
  animate(marker: Marker){
    if (this.routingControl)
    this.routingControl.on('routesfound', (event: any) => {
      event.routes[0].coordinates.forEach(function(coord: Leaflet.LatLng, index: number) {
        setTimeout(() => {
          marker.setLatLng([coord.lat, coord.lng]);
        }, 100 * index);
      });
    });

  }





  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

}
