import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { ConnectivityService } from '../../providers/network/connectivity-service';
//import { Incidente } from '../../models/incidente.model';


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
  public lato; 
  public lngo;
  public tipo_denuncia = 1;

  //public incidente: Incidente;

  @ViewChild("map") mapElement;
  map: any;

  //public navParams: NavParams,
  constructor(
    public navCtrl: NavController,
    private http: Http,
    private connectivityService: ConnectivityService, 
    private geolocation: Geolocation) {}

  ngOnInit(){
    this.loadMap();
    //this.incidente = this.navParams.get('incidente');
  }

  loadMap(){

    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition(locationOptions).then((position) => {
      // setear lat lng
      this.lato = position.coords.latitude;
      this.lngo =  position.coords.longitude;
      //console.log("incidente"+ this.incidente);

      this.http.get(`${URL}/incidente/dependencia/1`).subscribe(datae => {
        var json = datae.json();
        console.log(json);

        let latLngs = new google.maps.LatLng(this.lato, this.lngo);
      
        let mapOptions = {
          center: latLngs,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        // mi marcador 

        let markerActual = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: latLngs
          //,icon: 'http://www.cartagram.com/wp-content/uploads/2013/04/blog_custommarkers_2a.png'
      });
  
      let markerInfo = "<h4>Estas aquí</h4>";
  
      let infoModal = new google.maps.InfoWindow({
          content: markerInfo
      });
  
      google.maps.event.addListener(markerActual, 'click', () => {
          infoModal.open(map, markerActual);
      });

        // mi marcador
    
        // Looping through the JSON data
        for (var i = 0, length = json.length; i < length; i++) {
          var data = json[i],
            latLng = new google.maps.LatLng(data.lat, data.lng);
          
            // render de acuerdo a que tipo sea.
          var iconoRender;
          // 1 - hospiales
          if(this.tipo_denuncia == 1){
            iconoRender = 'http://maps.google.com/mapfiles/ms/icons/hospitals.png';
          // 2 - dependencias policiales
          } else if(this.tipo_denuncia == 2){
            iconoRender = 'http://maps.google.com/mapfiles/ms/icons/police.png';
          // 3- bomberos    
          } else if(this.tipo_denuncia == 3){
            iconoRender = 'http://maps.google.com/mapfiles/ms/icons/firedept.png';
          }

          // Creating a marker and putting it on the map
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: iconoRender
          });
    
          // Creating a global infoWindow object that will be reused by all markers
          var infoWindow = new google.maps.InfoWindow();
  
          // Creating a closure to retain the correct data, notice how I pass the current data in the loop into the closure (marker, data)
          (function(marker, data) {
    
            // chequear los que no tengan numeros.  
            if(data.numero == 0){
              data.numero = " - (Sin datos)";
            } 

            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
              var contentString = '<b><h5>'+data.nombre+'</h5></b>'+
              '<p><b>Dirección: </b>'+data.direccion+'.</p>'+
              '<p><b>Numero: </b>0'+data.numero+'.</p>';
              infoWindow.setContent(contentString);
              infoWindow.open(map, marker);
            });
    
    
          })(marker, data);
    
        }
        
      }, err => {
        // error de conexion
        this.connectivityService.offline();
      });


    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

}
