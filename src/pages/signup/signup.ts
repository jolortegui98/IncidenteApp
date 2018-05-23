import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'; 

// importar alerta de ionic
import { AlertController } from "ionic-angular";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  nombre:string;
  apellido:string;
  email: string; 
  password:string;

  // datos provenientes del rest
  token:string;
  id_usuario:string;

  // injecciones de modulos
  constructor(public navCtrl: NavController, public http: Http,
              private alertCtrl: AlertController)
              {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

    registro() {
	    let headers = new Headers();
	    headers.append("Accept", 'application/json');
	    headers.append('Content-Type', 'application/json' );
	    let options = new RequestOptions({ headers: headers });
	 
	  // datos a enviar desde el form
	    let json = {
	      nombre: this.nombre,
	      apellido: this.apellido,	
	      email: this.email,
	      password: this.password
	    }
	    
	    this.http.post("http://incidentespy.info/core/api.php/login/registro", json, options)
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
		                        
		                        // crea un alert
		                        this.alertCtrl.create({
						            title: "Registro exitoso",
						            subTitle: data_resp.mensaje,
						            buttons: ["OK"]
		          				}).present();
		                        console.log(data_resp);
		                      }        
		       }, error => {
		        console.log(error);// Error getting the data
		      });
	  }

}