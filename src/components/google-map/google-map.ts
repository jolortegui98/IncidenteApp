import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

declare const google;

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})

export class GoogleMapComponent {

  @ViewChild("map") mapElement;
  map: any;
  constructor(private geolocation: Geolocation, private loadingCtrl: LoadingController) {
    //this.initializeMap();
  }

  ngOnInit(){
    this.initializeMap();
  }
  
  initializeMap() {
        //Show loading
        let loader = this.loadingCtrl.create({
          content: "Cargando mapa de ubicacion..."
        });
        loader.present();

    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
 

    this.geolocation.getCurrentPosition(locationOptions).then((position) => {
 
        let options = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        console.log("lat: " + position.coords.latitude);
        console.log("lng: " + position.coords.longitude);

        /* Show our lcoation */
        this.map = new google.maps.Map(document.getElementById("map"), options);
        loader.dismiss();
          /* We can show our location only if map was previously initialized */
          this.showMyLocation();
        
    }).catch((error) => {
      console.log('Error getting location', error);
    });
} 

      showMyLocation(){

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });

        let markerInfo = "<h4>Estas aquí!</h4>";         

        let infoModal = new google.maps.InfoWindow({
            content: markerInfo
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoModal.open(this.map, marker);
        });
      }
}
