import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Platform, AlertController, ToastController } from 'ionic-angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';

// Next Page
import { TipoPage } from '../tipo/tipo';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})

export class InicioPage {

  // Variables
  public range: number;
  public phoneNumber: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callNumber: CallNumber,
    public diagnostic: Diagnostic,
    public platform: Platform,
    public openNativeSettings: OpenNativeSettings,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController) {
    this.range = 0;
    this.phoneNumber = '911';
    this.checkLocation();
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
			title : 'Se requiere GPS',
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
}
