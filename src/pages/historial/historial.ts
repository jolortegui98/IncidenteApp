import { Component } from '@angular/core';
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
  public mensa = "No posee denuncias";

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
                this.token = val;
                this.http.get(`${URL}/incidente/denunciasUsuario/${val}`).subscribe(data => {
                  this.denuncias = data;
                  // verificar que existe el objeto
                  if (Object.keys(this.denuncias).length) {
                    this.mensa = "Resumen de denuncias";
                  }
                }, err => {
                  console.log(err);
                });
              });
            }
    }

  ngOnInit(){}
}
