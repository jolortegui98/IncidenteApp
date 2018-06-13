import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL } from './../../utils/variables';
import { ConnectivityService } from '../../providers/network/connectivity-service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [ConnectivityService]
})

export class SignupPage {
  // Usuario
  public nombre: string;
  public apellido: string;
  public email: string;
  public password: string;

  // injecciones de modulos
  constructor(
    private navCtrl: NavController,
    private http: Http,
    private alertCtrl: AlertController,
    private connectivityService: ConnectivityService
  ) {}

  ionViewDidLoad() {}

  registro() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers });

    // datos a enviar desde el form
    let json = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password
    }

    this.http.post(`${URL}/login/registro`, json, options)
      .subscribe(data => {
        console.log(data['_body']);
        let data_resp = data.json();
        //console.log(data_resp);

        // si se produce un error
        if (data_resp.error) {
          this.alertCtrl.create({
            title: "Error!",
            subTitle: data_resp.mensaje,
            buttons: ["Aceptar"]
          }).present();
        } else { // exito de peticion
          // crea un alert
          this.alertCtrl.create({
            title: "Registro exitoso",
            subTitle: data_resp.mensaje,
            buttons: ["Aceptar"]
          }).present();
          console.log(data_resp);
          this.navCtrl.popToRoot();
        }
      }, error => {
        this.connectivityService.offline();
      });
  }
}
