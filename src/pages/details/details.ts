import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { InicioPage } from '../inicio/inicio';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConnectivityService } from '../../providers/network/connectivity-service';
import { AlertController, Platform } from 'ionic-angular';
import { URL } from './../../utils/variables';
import { Storage } from '@ionic/storage';
import { Incidente } from '../../models/incidente.model';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [ConnectivityService]
})

export class DetailsPage {
  myphoto:any;
  comentario = " ";
  fileNameSend: string;
  public token;
  public incidente: Incidente;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    private transfer: FileTransfer, private loadingCtrl: LoadingController, public http: Http,
    private alertCtrl: AlertController, private storage: Storage, private platform: Platform,
    private connectivityService: ConnectivityService) {}

    ionViewDidLoad() {
      // get token from storage
      if (this.platform.is('cordova')) {
        this.storage.get('token').then( token => { this.token = token } );
      } else {
        this.token = localStorage.getItem('token');
      }
      console.log(this.token);
  
      this.incidente = this.navParams.get('incidente');

    }

  takePhoto(){
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true 
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  uploadImage(){
          //Show loading
          let loader = this.loadingCtrl.create({
            content: "Actualizando incidente..."
            });

        // foto no creada
        if(!this.myphoto){
          loader.dismiss();
          this.mensajeError().then((result) => {
            if(result === false){
              // Se redirecciona al inicio
              this.navCtrl.push(InicioPage);
            }
          })
        }
    
          

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 1000);
    // current date
    var myDate: String = new Date().toISOString();

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "myImage_" + random + "_" +  myDate + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    //loader.present();
    //file transfer action
    fileTransfer.upload(this.myphoto, 'http://incidentespy.info/core/uploads/uploadPhoto.php', options)
      .then((data) => {
        
        // si ambos valores estan cargadors
        loader.present(); 
        this.actualizarIncidente(this.comentario, options.fileName);
        loader.dismiss(); 
        this.mensajeExito().then((result) => {
          if(result){
            // Se redirecciona solo cuando presiona OK
            this.navCtrl.push(InicioPage);
          }
        })

      }, (err) => {
        console.log(err);
      });
  }

    mensajeError(): Promise<boolean> {
      return new Promise((resolve, reject) =>{
        this.alertCtrl.create({
        title : 'Advertencia',
        subTitle: 'Por favor, complete los campos.',
        buttons: [
          {
            text: 'Cancelar',
            handler:_=> resolve(false)
          },
          {
            text: 'Aceptar',
            handler : () =>{ }
          }, 
        ]
        }).present();
      })
      }

      mensajeExito(): Promise<boolean> {
        return new Promise((resolve, reject) =>{
          this.alertCtrl.create({
          title : 'Exito!',
          subTitle: 'El incidente ha sido actualizado.',
          buttons: [
            {
            text: 'Aceptar',
            handler:_=> resolve(true)
            }
          ]
          }).present();
        })
        }
    
  actualizarIncidente(comentario, nombreImagen){
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers });

      // datos a enviar desde el form
      let json = {
        comentario: comentario,
        imagen: nombreImagen
      }

      this.http.post(`${URL}/incidente/detail/${this.token}`, json, options)
        .subscribe(data => {
          console.log(data['_body']);
          let data_resp = data.json();
          // si se produce un error
          if (data_resp.error) {
            this.alertCtrl.create({
              title: 'Error!',
              subTitle: data_resp.mensaje,
              buttons: ['Aceptar']
            }).present();
          } else { // exito de peticion
            console.log("exito actualizada la foto");
          }
        }, error => {
          this.connectivityService.offline();
        });
  }

}
