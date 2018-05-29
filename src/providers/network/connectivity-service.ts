import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ConnectivityService {
 
    constructor(public toast: ToastController){}

    offline(){
      this.toast.create({
        message: `Se necesita conexion a internet.`,
        duration: 3000
      }).present(); 
    }

}
