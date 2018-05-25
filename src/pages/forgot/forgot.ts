import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//import { url } from './../../utils/GLOBAL';

// importar alerta de ionic
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  // definicion de variables
  public email: string;
  public password1: string;
  public password2: string;


  // injecciones de modulos
  constructor(
    public navCtrl: NavController,
    public http: Http,
    private alertCtrl: AlertController
  ) {}

  forgot(){
    console.log("Muestra forgot");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }

}
