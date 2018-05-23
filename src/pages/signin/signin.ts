import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'; 

// importar alerta de ionic
import { AlertController, Platform } from "ionic-angular";

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

// plugin storage
import { Storage } from '@ionic/storage';

@Component({
  selector: 'signin-home',
  templateUrl: 'signin.html',
})

export class SigninPage {
  // definicion de variables
  email:string = "";
  password:string = "";

  // datos provenientes del rest
  id_usuario:string;
  token:string;

  // injecciones de modulos
  constructor(public navCtrl: NavController, 
  			  public http: Http,
              private alertCtrl: AlertController,
              private platform: Platform,
              private storage: Storage) {
  }

    ingresar() {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
 
  // datos a enviar desde el form
    let json = {
      email: this.email,
      password: this.password
    }
    
    this.http.post("http://incidentespy.info/core/api.php/login", json, options)
      .subscribe(data => {
        console.log(data['_body']);
        let data_resp = data.json();

        //console.log(data_resp);
        // si se produce un error
                      if(data_resp.error){
                        this.alertCtrl.create({
                          title: "Error!",
                          subTitle: data_resp.mensaje,
                          buttons: ["OK"]
                        }).present();
                      }else { // exito de peticion
                        // almacena token e id_usuario
                        this.token = data_resp.token;
                        this.id_usuario = data_resp.id_usuario;
                        // crea un alert - No se muestra por que el usuario existe.
                        /*
	                        this.alertCtrl.create({
					            title: "Exito.",
					            subTitle: data_resp.mensaje,
					            buttons: ["OK"]
	          				}).present();
          				*/
          				this.navCtrl.push(HomePage, {});
                        console.log(data_resp);

                        // guardar storage
                        this.guardar_storage();
                      }        
       }, error => {
        console.log(error);// Error getting the data
      });
  }

    guardar_storage(){
    if( this.platform.is("cordova") ){
      // dispositivo
      this.storage.set('token', this.token );
      this.storage.set('id_usuario', this.id_usuario );
    }else{
      // computadora
      if( this.token ){
        localStorage.setItem("token",  this.token  );
        localStorage.setItem("id_usuario",  this.id_usuario  );
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
        // Guardar Storage
        this.guardar_storage();
      }
    }
  }

  saltar(){
  	this.navCtrl.push(SignupPage, {});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signin');
  }

}
