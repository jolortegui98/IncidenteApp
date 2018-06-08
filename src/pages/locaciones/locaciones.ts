import { Component, ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Http } from '@angular/http';
import { ConnectivityService } from '../../providers/network/connectivity-service';

// Components
import { URL } from '../../utils/variables';

declare const google;

@Component({
  selector: 'locaciones',
  templateUrl: 'locaciones.html',
  providers: [ConnectivityService]
})

export class LocacionesPage {
  public locaciones = [];

  @ViewChild("map") mapElement;
  //map: any;

  constructor(
    public navCtrl: NavController,
    private http: Http,
    private connectivityService: ConnectivityService,) {}

  ngOnInit(){
    this.loadMap();
  }

  loadMap(){

    this.http.get(`${URL}/incidente/hospital`).subscribe(datae => {
      var json = datae.json();
      console.log(json);

      let latLngs = new google.maps.LatLng(-25.285992, -57.588138);
    
      let mapOptions = {
        center: latLngs,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      
      var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
       
      // Creating a global infoWindow object that will be reused by all markers
      var infoWindow = new google.maps.InfoWindow();
  
      // Looping through the JSON data
      for (var i = 0, length = json.length; i < length; i++) {
        var data = json[i],
          latLng = new google.maps.LatLng(data.lat, data.lng);
  
        // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
  
        // Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
        (function(marker, data) {
  
          // Attaching a click event to the current marker
          google.maps.event.addListener(marker, "click", function(e) {
            infoWindow.setContent(data.nombre+ " " +data.direccion+ " " +data.numero);
            infoWindow.open(map, marker);
          });
  
  
        })(marker, data);
  
      }
      
    }, err => {
      // error de conexion
      this.connectivityService.offline();
    });
  
  }

}
