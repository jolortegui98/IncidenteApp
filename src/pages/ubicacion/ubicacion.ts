import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

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
    private platform: Platform
  ) {
      this.ubicacion = '0a987sd9f07';
    }

  ionViewDidLoad() {
    // Capture data of the previous page
    this.tipoIncidente = this.navParams.get('tipoIncidente');
    this.detalleTipo = this.navParams.get('detalleTipo');

    // Debug only
    // console.log(this.tipoIncidente);
    // console.log(this.detalleTipo);
  }

  enviarIncidente() {
    // get token from storage
    this.platform.is('cordova')
    ?
      this.token = this.storage.get('token')
    :
      this.token = localStorage.getItem('token');

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
        data_resp.error
        ?
          // if some error
          this.alertCtrl.create({
            title: 'Error!',
            subTitle: data_resp.mensaje,
            buttons: ['OK']
          }).present()
        :
          // if all ok
          this.navCtrl.push(EnviadoPage);

      }, error => {
        console.log(error); // Error getting the data
      });
  }

}
