import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
// import de pagina Detalle
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-enviado',
  templateUrl: 'enviado.html',
})
export class EnviadoPage {
  public phoneNumber: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callNumber: CallNumber) {
    this.phoneNumber = '911';
  }

  ionViewDidLoad() {}

  call() {
    this.callNumber.callNumber(this.phoneNumber, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  goToNextPage() {
    this.navCtrl.popToRoot();
  }

  /* Implementacion del Domingo 04-06-28*/ 
  moreDetails(){
    this.navCtrl.push(DetailsPage);
  }
  /* Implementacion del Domingo 04-06-28*/ 

}
