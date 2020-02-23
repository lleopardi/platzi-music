import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { icon, LatLng, marker, tileLayer, polyline } from 'leaflet';
import { from, Observable, bindCallback, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage {

  currentCenter: LatLng;
  coordinates: LatLng[] = [];
  options$: Observable<any>;
  layer;

  constructor() {
    this.trackPosition();
    Geolocation.watchPosition({}, (data) => {
      console.log(data);
    });
  }

  ionViewDidEnter() {
    this.options$ = this.getCurrentPosition();
  }

  getCurrentPosition() {
    return from(Geolocation.getCurrentPosition()).pipe(
      map((geolocation) => new LatLng(geolocation.coords.latitude, geolocation.coords.longitude)),
      catchError(error => {
        console.log(error);
        return of(new LatLng(-12.0984528, -77.0767132));
      }),
      map((center) => this.startMap(center))
    );
  }

  private startMap(position: LatLng) {
    console.log(position);
    return {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 15,
      center: position
    };
  }

  trackPosition() {
    // bindCallback(Geolocation.watchPosition)({}).subscribe(data => console.log(data));
    Geolocation.watchPosition({}, (position) => {
      const coordinatesTemp = [...this.coordinates];
      this.currentCenter = new LatLng(position.coords.latitude, position.coords.longitude);
      this.coordinates = [...coordinatesTemp, this.currentCenter];
      this.layer = this.getMarker(this.currentCenter);
      console.log(this.coordinates);
    });
  }

  getMarker(position: LatLng) {
    return [
      marker(position, {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/img/bicycle.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }),
      polyline(this.coordinates)
    ];
  }

}
