import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Next page import
import { DetalleTipoPage } from '../detalle-tipo/detalle-tipo';

// Components
import { BtnBackComponent } from '../../components/btn-back/btn-back';


@Component({
  selector: 'page-tipo',
  templateUrl: 'tipo.html',
})

export class TipoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

  }

  goToNextPage(tipoIncidente) {
    console.log(tipoIncidente);
    this.navCtrl.push(DetalleTipoPage, {
      tipoIncidente
    });
  }
}
