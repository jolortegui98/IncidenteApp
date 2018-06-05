import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Next page import
import { UbicacionPage } from '../ubicacion/ubicacion';

@Component({
  selector: 'page-detalle-tipo',
  templateUrl: 'detalle-tipo.html'
})
export class DetalleTipoPage {

  private tipoIncidente;
  public detalleTipo;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detalleTipo = {
      op1: false,
      op2: false,
      op3: false,
      op4: false
    };
  }

  ionViewDidLoad() {
    // Capture data of the previous page
    this.tipoIncidente = this.navParams.get('tipoIncidente');
    // Debug only
    console.log(this.tipoIncidente);
  }

  // Push new data and go to the other page
  goToNextPage() {
    console.log(this.detalleTipo);
    this.navCtrl.push(UbicacionPage, {
      tipoIncidente: this.tipoIncidente,
      detalleTipo: this.detalleTipo
    });
  }
}
