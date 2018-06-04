import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL } from './../../utils/variables';
//import { ConnectivityService  } from '../../providers/network/connectivity-service';

// importar alerta de ionic
import { AlertController, Platform } from 'ionic-angular';

// importar signin
import { SigninPage } from '../signin/signin';

// storage post
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
  //,providers: [ConnectivityService]
})
export class ForgotPage {
  // definicion de variables
  public email: string;
  public password1: string;
  public password2: string;
  public token;

  // injecciones de modulos
  constructor(
    public navCtrl: NavController,
    public http: Http,
    public alertCtrl: AlertController,
    public platform: Platform,
    public storage: Storage //,public connectivityService: ConnectivityService
  ) {}

  isValidForm() {
    return this.password1 != this.password2 ? false : true;
  }

  forgot(){
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
      let json = {
        email: this.email,
        password1: this.password1,
        password2: this.password2
      }

      this.http.post(`${URL}/login/reset/${this.token}`, json, options)
      .subscribe(data => {
        console.log(data['_body']);
        let data_resp = data.json();
        if (data_resp.success) {
          this.alertCtrl.create({
            title: 'Exito!',
            subTitle: data_resp.mensaje,
            buttons: ['OK']
          }).present();
          this.navCtrl.push(SigninPage, {});
        } else {
          this.alertCtrl.create({
            title: 'Error!',
            subTitle: data_resp.mensaje,
            buttons: ['OK']
          }).present();
          // refresca para que vuelva a ingresar
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }
      }, error => {
        console.log(error); // Error getting the data
      });
  }
}
