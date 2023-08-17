import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import {MapService} from "../service/map.service";
import {ArchEntry} from "../model/ArchEntry";

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

    })

  }
  generateMarker(data: any, index: number) {
    const smallIcon = new Leaflet.Icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [20, 40],
    });
    return Leaflet.marker({ lat: data.position.lat, lng: data.position.lan }, {
      draggable: data.draggable,
      icon: smallIcon
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
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }
}
