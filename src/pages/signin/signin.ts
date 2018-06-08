import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL } from './../../utils/variables';

// importar alerta de ionic
import { AlertController, Platform } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';

// plugin storage
import { Storage } from '@ionic/storage';
import { InicioPage } from '../inicio/inicio';
import { ConnectivityService } from '../../providers/network/connectivity-service';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [ConnectivityService]
})

export class SigninPage {
  // definicion de variables
  public email: string;
  public password: string;

  // datos provenientes del rest
  private id_usuario: string;
  private token: string;

  // injecciones de modulos
  constructor(
    public navCtrl: NavController,
    public http: Http,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage,
    private connectivityService: ConnectivityService
  ) {}

  ingresar() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers });

    // datos a enviar desde el form
    let json = {
      email: this.email,
      password: this.password
    }

    this.http.post(`${URL}/login`, json, options)
      .subscribe(data => {
        console.log("resultado del post "+data['_body']);
        let data_resp = data.json();
        // si se produce un error
        if (data_resp.error) {
          this.alertCtrl.create({
            title: 'Error!',
            subTitle: data_resp.mensaje,
            buttons: ['OK']
          }).present();
        } else { // exito de peticion
          // almacena token e id_usuario
          this.token = data_resp.token;
          this.id_usuario = data_resp.id_usuario;
          this.navCtrl.push(InicioPage, {});
          // guardar storage
          this.guardar_storage();
        }
      }, error => {
        this.connectivityService.offline();
      });
}

  guardar_storage() {
    if (this.platform.is('cordova')) {
      // dispositivo
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);
    } else {
      // computadora
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('id_usuario', this.id_usuario);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('id_usuario');
        // Guardar Storage
        this.guardar_storage();
      }
    }
  }

  saltar() {
    this.navCtrl.push(SignupPage, {});
  }

  forgot() {
    this.navCtrl.push(ForgotPage, {});
  }

}
