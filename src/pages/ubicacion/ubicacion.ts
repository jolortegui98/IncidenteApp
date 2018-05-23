import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker
// } from '@ionic-native/google-maps';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

import { Incidente } from '../../models/incidente.model';

// Next page Import
import { EnviadoPage } from '../enviado/enviado';

// Components
import { BtnBackComponent } from '../../components/btn-back/btn-back';


@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
})
export class UbicacionPage {
  // Var
  public incidente: Incidente;
  public headers;
  // map: GoogleMap;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private platform: Platform,
    // private geolocation: Geolocation,
    private http: HttpClient
  ) {
    // platform.ready().then(() => {

    //   // get current position
    //   geolocation.getCurrentPosition().then(pos => {
    //     console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
    //   });

    //   const watch = geolocation.watchPosition().subscribe(pos => {
    //     console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
    //   });

    //   // to stop watching
    //   watch.unsubscribe();

    // });
  }

  ionViewDidLoad() {
    // this.loadMap();
  }

  // loadMap() {
  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //       target: {
  //         lat: pos.coords.latitude,
  //         lng: -89.3809802
  //       },
  //       zoom: 18,
  //       tilt: 30
  //     }
  //   };

  //   this.map = GoogleMaps.create('map_canvas', mapOptions);

  //   // Wait the MAP_READY before using any methods.
  //   this.map.one(GoogleMapsEvent.MAP_READY)
  //     .then(() => {
  //       console.log('Map is ready!');

  //       // Now you can use all methods safely.
  //       this.map.addMarker({
  //         title: 'Ionic',
  //         icon: 'blue',
  //         animation: 'DROP',
  //         position: {
  //           lat: 43.0741904,
  //           lng: -89.3809802
  //         }
  //       })
  //         .then(marker => {
  //           marker.on(GoogleMapsEvent.MARKER_CLICK)
  //             .subscribe(() => {
  //               alert('clicked');
  //             });
  //         });

  //     });
  // }

  goToNextPage() {
    this.navCtrl.push(EnviadoPage);
  }
}
