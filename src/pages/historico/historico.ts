import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform} from 'ionic-angular';
import { URL } from '../../utils/variables';

@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html'
})

export class HistoricoPage {
  denuncias: any;
  public token;
  public id_usuario;

  constructor(public navCtrl: NavController, 
    private storage: Storage,
    public http: HttpClient,
    private platform: Platform) {      
      this.obtenerDenuncias();
    }

    ionViewDidLoad() {
      // get token from storage
      if (this.platform.is('cordova')) {
        this.storage.get('token').then( token => { this.token = token } );
        this.storage.get('id_usuario').then( id_usuario => { this.id_usuario = id_usuario } );
        console.log("Dentro del if "+ this.token);
        console.log("Dentro del if "+ this.id_usuario);
      } else {
        this.token = localStorage.getItem('token');
      }
      console.log("token browser "+this.token);
    }

    obtenerDenuncias() {
      return new Promise(resolve => {
        this.http.get(URL+'/incidente/denunciasUsuario/'+this.token)
        .subscribe(data => {
          this.denuncias = data;
          console.log(this.denuncias);
        }, err => {
          console.log("Un error a ocurido "+err);
        });
      });
  
    }
}