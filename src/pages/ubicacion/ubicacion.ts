import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

// Models
import { Incidente } from '../../models/incidente.model';

// Components
import { EnviadoPage } from '../enviado/enviado';
import { BtnBackComponent } from '../../components/btn-back/btn-back';
import { URL } from '../../utils/variables';

// storage post
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
})

export class UbicacionPage {
  // Var
  private tipoIncidente;
  private detalleTipo;
  public ubicacion;
  public token;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private alertCtrl: AlertController,
    private storage: Storage,
    private platform: Platform,
    private geolocation: Geolocation
  ) {
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.ubicacion = `${resp.coords.latitude},${resp.coords.longitude}`
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
      });
    }

  ionViewDidLoad() {
    // Capture data of the previous page
    this.tipoIncidente = this.navParams.get('tipoIncidente');
    this.detalleTipo = this.navParams.get('detalleTipo');

    // get token from storage
    if (this.platform.is('cordova')) {
      this.storage.get('token').then( token => { this.token = token } );
    } else {
      this.token = localStorage.getItem('token');
    }
    console.log(this.token);

    // Debug only
    // console.log(this.tipoIncidente);
    // console.log(this.detalleTipo);
  }

  enviarIncidente() {
    // prepare Headers to post
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers });

    // prepare json to post
    let json: Incidente = {
      tipo_incidente: this.tipoIncidente,
      descripcion: this.detalleTipo,
      ubicacion: this.ubicacion,
      estado: 1
    }

    // post to the api
    this.http.post(`${URL}/test/send/${this.token}`, json, options)
      .subscribe(data => {
        const data_resp = data.json();

        // handling response
        if (data_resp.error) {
          // if some error
          this.alertCtrl.create({
            title: 'Error!',
            subTitle: data_resp.mensaje,
            buttons: ['OK']
          }).present()
        } else {
          // if all ok
          this.navCtrl.push(EnviadoPage);
        }

      }, error => {
        console.log(error); // Error getting the data
      });
  }

}
