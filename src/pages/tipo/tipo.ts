import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// nuevos imports
import { Platform, AlertController, ToastController } from 'ionic-angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';

// Next page import
import { DetalleTipoPage } from '../detalle-tipo/detalle-tipo';

@Component({
  selector: 'page-tipo',
  templateUrl: 'tipo.html',
})

export class TipoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public diagnostic: Diagnostic,
    public platform: Platform,
    public openNativeSettings: OpenNativeSettings,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController) {
    this.checkLocation();
  }

    /* Implementacion del Domingo 04-06-28*/
    checkLocation() {
      this.platform.ready().then((readySource) => {
    
        this.diagnostic.isLocationEnabled().then(
          (isAvailable) => {
  
            if(isAvailable === false){
  
              this.mensajeGps().then((result) => {
                if(result){
                  // Se abre el setting de GPS
                  this.openNativeSettings.open('location');
                }
              })
            
            }else {
              // mensaje de internet disponible
              this.toastCtrl.create({
                message: 'El GPS esta activado.',
                duration: 3000
              }).present(); 
            }
                
            }).catch((e) => {});
    
      });
    }
  
    mensajeGps(): Promise<boolean> {
      return new Promise((resolve, reject) =>{
        this.alertCtrl.create({
        title : 'Advertencia!',
        subTitle: 'Esta aplicacion require GPS.',
        buttons: [
          {
          text: 'OK',
          handler:_=> resolve(true)
          }
        ]
        }).present();
      })
      }
  
     /* Implementacion del Domingo 04-06-28*/  

  ionViewDidLoad() {

  }

  goToNextPage(tipoIncidente) {
    console.log(tipoIncidente);
    this.navCtrl.push(DetalleTipoPage, {
      tipoIncidente
    });
  }
}
