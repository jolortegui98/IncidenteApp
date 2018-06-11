import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
// import de pagina Detalle
import { DetailsPage } from '../details/details';
import { Incidente } from '../../models/incidente.model';
import { LocacionesPage } from '../locaciones/locaciones';
import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-enviado',
  templateUrl: 'enviado.html',
})
export class EnviadoPage {
  public phoneNumber: string;
  private incidente: Incidente;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callNumber: CallNumber) {
    this.phoneNumber = '911';
  }

  ionViewDidLoad() {
    this.incidente = this.navParams.get('json');
  }

  call() {
    this.callNumber.callNumber(this.phoneNumber, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  // pop to inicio
  goToNextPage() {
    this.navCtrl.push(InicioPage, {});
  }

  /* Implementacion del Domingo 04-06-28*/
  moreDetails(){
    this.navCtrl.push(DetailsPage, { incidente: this.incidente });
  }
  /* Implementacion del Domingo 04-06-28*/

  locaciones(){
    this.navCtrl.push(LocacionesPage, { incidente: this.incidente });
  }
}
