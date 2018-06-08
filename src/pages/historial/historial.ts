import { Component, ViewChild } from '@angular/core';
//import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

// Components
import { URL } from '../../utils/variables';

// storage post
import { Storage } from '@ionic/storage';

@Component({
  selector: 'historial',
  templateUrl: 'historial.html'
})

export class HistorialPage {
  token: any;
  public denuncias: any;
  public id_usuario;

  @ViewChild("map") mapElement;
  
  map: any;
  //private geolocation: Geolocation,
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform) {
            // get token from storage
            if (this.platform.is('cordova')) {
              this.storage.get('token').then((val) => {
                this.http.get(`${URL}/incidente/denunciasUsuario/${val}`).subscribe(data => {
                  this.denuncias = data;
                  console.log(this.denuncias);
                }, err => {
                  console.log(err);
                });
                console.log('Your token is', val);
              });
              //this.storage.get('token').then( token => { this.token = token } );
            } else {
              this.token = localStorage.getItem('token');
              
            }
            console.log(this.token);
    }

  ngOnInit(){}
}
