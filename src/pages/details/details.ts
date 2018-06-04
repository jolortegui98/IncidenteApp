import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})

export class DetailsPage {
  myphoto:any;
  comentario: string;

  constructor(public navParams: NavParams, public navCtrl: NavController, private camera: Camera, 
    private transfer: FileTransfer, private file: File, 
    private loadingCtrl: LoadingController) {
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
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
    loader.present();

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 100);

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "myImage_" + random + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    //file transfer action
    fileTransfer.upload(this.myphoto, 'http://incidentespy.info/core/uploads/uploadPhoto.php', options)
      .then((data) => {
        alert("Incidente Actualizado!");
        loader.dismiss();
        this.navCtrl.push(InicioPage);
      }, (err) => {
        console.log(err);
        alert("Error");
        loader.dismiss();
      });
  }

  /*
  hacer una funcion que reciba como parametro el nombre de la imagen
   y el texto que voy a ingresar, y que cuando sea success actualize en la db
   recibiendo esos dos parametros.
  
  updateDetalle(options.fileName, this.comentario){
    send to db, UPDATE.
  }
   */

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
