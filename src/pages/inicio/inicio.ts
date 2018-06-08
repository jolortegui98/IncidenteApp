import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

// Paginas
import { TipoPage } from '../tipo/tipo';
import { SigninPage } from '../signin/signin';
import { HistorialPage } from '../historial/historial';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})

export class InicioPage {

  // Variables
  public range: number;
  public phoneNumber: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callNumber: CallNumber) {
    this.range = 0;
    this.phoneNumber = '911';
  }

  ionViewDidLoad() {}

  ionViewDidLeave() {
    this.range = 0;
  }

  onChange(rangeValue: number) {
    if (this.range >= 90) {
      this.range = 100;
      this.navCtrl.push(TipoPage);
    } else {
      this.range = 0;
    }
  }

  call() {
    this.callNumber.callNumber(this.phoneNumber, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  cerrar(){
    this.navCtrl.push(SigninPage);
  }

  historico(){
    this.navCtrl.push(HistorialPage);
  }
  
}
