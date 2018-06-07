import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../utils/variables';
import { Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class HistoricoProvider {
  public token;

  constructor(public http: HttpClient, public storage: Storage, public platform: Platform) {}

  obtenerDenuncias() {
    // get token from storage
    if (this.platform.is('cordova')) {
          this.storage.get('token').then( token => { this.token = token } );
    } else {
          this.token = localStorage.getItem('token');
    }
        console.log(this.token);

    return new Promise(resolve => {
      this.http.get(`${URL}/incidente/denunciasUsuario/${this.token}`)
      .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }
}
