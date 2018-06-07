import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoricoProvider  } from '../../providers/historico/historico';

@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
  providers: [HistoricoProvider]
})
export class HistoricoPage {
  denuncias: any;
  //denun: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private historico: HistoricoProvider) {
      this.getDenuncias();
    }

    getDenuncias() {
      this.historico.obtenerDenuncias()
      .then(data => {
        this.denuncias = data;
        /*
        if(data){
          Object.keys(data).forEach(function(key) {
            this.denun.push(data[key]);
          });
        }*/
        console.log(this.denuncias);
      });
    }
}