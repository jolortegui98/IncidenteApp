import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Incidente } from '../../models/incidente.model';

// Next page Import
import { EnviadoPage } from '../enviado/enviado';

// Components
import { BtnBackComponent } from '../../components/btn-back/btn-back';
import { url } from '../../utils/GLOBAL';


@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
})
export class UbicacionPage {
  // Var
  private tipoIncidente;
  private detalleTipo;
  public ubicacion;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private alertCtrl: AlertController,
  ) { this.ubicacion = '0a987sd9f07' }

  ionViewDidLoad() {
    // Capture data of the previous page
    this.tipoIncidente = this.navParams.get('tipoIncidente');
    this.detalleTipo = this.navParams.get('detalleTipo');
    // Debug only
    // console.log(this.tipoIncidente);
    // console.log(this.detalleTipo);
  }

  enviarIncidente() {
    /*
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers });
    const token = '53982760cc59668fc27333ed245fe1894658471a';
    */
    // datos a enviar desde el form
    const json = {
      tipo_incidente: this.tipoIncidente,
      descripcion: this.detalleTipo,
      ubicacion: this.ubicacion,
      estado: 1
    }
    console.log(json);
    /*
    this.http.post(`${url}send/${token}`, json, options)
      .subscribe(data => {
        console.log(data['_body']);
        let data_resp = data.json();

        if (data_resp.error) {
          this.alertCtrl.create({
            title: 'Error!',
            subTitle: data_resp.mensaje,
            buttons: ['OK']
          }).present();
        }

        else {
          this.navCtrl.push(EnviadoPage, {});
          console.log(data_resp);
        }
      }, error => {
        console.log(error); // Error getting the data
      });
      */
  }
}
