import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL } from './../../utils/variables';

// importar alerta de ionic
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
  // Usuario
  public nombre: string;
  public apellido: string;
  public email: string;
  public password: string;

  // datos provenientes del rest
  private token: string;
  private id_usuario: string;

  // injecciones de modulos
  constructor(
    private navCtrl: NavController,
    private http: Http,
    private alertCtrl: AlertController
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

    this.http.post(`${URL}login/registro`, json, options)
      .subscribe(data => {
        console.log(data['_body']);
        let data_resp = data.json();
        //console.log(data_resp);

        // si se produce un error
        if (data_resp.error) {
          this.alertCtrl.create({
            title: "Error!",
            subTitle: data_resp.mensaje,
            buttons: ["OK"]
          }).present();
        }

        else { // exito de peticion
          // almacena token e id_usuario
          this.token = data_resp.token;
          this.id_usuario = data_resp.id_usuario;

          // crea un alert
          this.alertCtrl.create({
            title: "Registro exitoso",
            subTitle: data_resp.mensaje,
            buttons: ["OK"]
          }).present();
          console.log(data_resp);
          this.navCtrl.popToRoot();
        }
      }, error => {
        console.log(error); // Error getting the data
      });
  }
}
