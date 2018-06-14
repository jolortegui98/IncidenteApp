import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConnectivityService } from '../../providers/network/connectivity-service';
import { Diagnostic } from '@ionic-native/diagnostic';

// Models
//import { Incidente } from '../../models/incidente.model';

// Components
import { EnviadoPage } from '../enviado/enviado';
import { URL } from '../../utils/variables';

// storage post
import { Storage } from '@ionic/storage';

declare const google;

@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
  providers: [ConnectivityService]
})

export class UbicacionPage {
  // Var
  private tipoIncidente;
  private detalleTipo;
  public ubicacion;
  public token;
  public respuestas = []; 

  @ViewChild("map") mapElement;
  map: any;

  constructor(private geolocation: Geolocation, private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private alertCtrl: AlertController,
    private storage: Storage,
    private platform: Platform,
    private connectivityService: ConnectivityService,
    public diagnostic: Diagnostic) {}

  ngOnInit(){
    this.initializeMap();
  }
      
  initializeMap() {
        //Show loading
        let loader = this.loadingCtrl.create({
          content: "Cargando mapa..."
        });
        loader.present();

    let locationOptions = {timeout: 12000, enableHighAccuracy: false};

    this.geolocation.getCurrentPosition(locationOptions).then((position) => {

      this.ubicacion = `${position.coords.latitude},${position.coords.longitude}`;

        let options = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        /* Show our location */
        this.map = new google.maps.Map(document.getElementById("map"), options);
        loader.dismiss();
          /* We can show our location only if map was previously initialized */
        this.showMyLocation();

    }).catch((error) => {
      // lanzador de mensaje con confirmacion
      loader.dismiss();
      this.mensajeReCheck().then((result) => {
        if(result){
          // vovler a lanzar la funcion de dibujar mapa
          this.reCheckLocation();
        }
      });
      
      console.log('Error getting location', error);
    });
}  

      showMyLocation(){

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });

        let markerInfo = "<h4>Estas aquí</h4>";

        let infoModal = new google.maps.InfoWindow({
            content: markerInfo
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoModal.open(this.map, marker);
        });
      }

      ionViewDidLoad() {
        // Capture data of the previous page
        this.tipoIncidente = this.navParams.get('tipoIncidente');
        this.detalleTipo = this.navParams.get('detalleTipo');
      
        //let respuesta_user = []; 

        /*let enumerableKeys = [];  
        for (let key in this.detalleTipo) {  
          enumerableKeys.push(key);
        }
        console.log("enumarableksys");
        console.log(enumerableKeys);
*/
        for (let key in this.detalleTipo) {
         // let value =this.detalleTipo[key];
          //console.log("key " + key + " value " + value);

          if(this.detalleTipo[key] === true){
            //console.log("cantidad verdaderas "+ key);

            if(key == 'op1'){
              //var res1 = respuesta: Accidente 1";
              this.respuestas.push({"respuesta": "Accidente 1"});
            }else if(key == 'op2'){
              //var res2 = "Accidente 2";
              this.respuestas.push({"respuesta": "Accidente 2"});
            }else if(key == 'op3'){
              //var res3 = "Accidente 3";
              this.respuestas.push({"respuesta": "Accidente 3"});
            }else if(key == 'op4'){
              //var res4 = "Accidente 4";
              this.respuestas.push({"respuesta": "Accidente 4"});
            }
          }
        }

        console.log("Array respuestas");
        console.log(this.respuestas);



        /*var ids:string = [];

        for(let result of this.detalleTipo){
          ids.push(result.Id);
        }*/
                
        // get token from storage
        if (this.platform.is('cordova')) {
          this.storage.get('token').then( token => { this.token = token } );
        } else {
          this.token = localStorage.getItem('token');
        }
        //console.log(this.token);
      }

      enviarIncidente() {
        // prepare Headers to post
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers });

        // prepare json to post
        let json = {
          tipo_incidente: this.tipoIncidente,
          descripcion: this.respuestas,
          ubicacion: this.ubicacion,
          estado: 1
        }

        // post to the api
        this.http.post(`${URL}/incidente/send/${this.token}`, json, options)
          .subscribe(data => {
            console.log("url "+ `${URL}/incidente/send/${this.token}`);
            const data_resp = data.json();

            // handling response
            if (data_resp.error) {
              // if some error
              this.alertCtrl.create({
                title: 'Error!',
                subTitle: data_resp.mensaje,
                buttons: ['Aceptar']
              }).present()
            } else {
              // if all ok
              this.navCtrl.push(EnviadoPage, { json });
            }

          }, error => {
            this.connectivityService.offline();
          });
      }

        reCheckLocation() {
          this.platform.ready().then((readySource) => {
        
            this.diagnostic.isLocationEnabled().then(
              (isAvailable) => {
      
                if(isAvailable === true){
                  this.initializeMap();
                }           
                }).catch((e) => {});
        
          });
        }

        mensajeReCheck(): Promise<boolean> {
          return new Promise((resolve, reject) =>{
            this.alertCtrl.create({
            title: 'Advertencia',
            subTitle: "Conexion perdida, reintentando establecer.",
            buttons: [
              {
              text: 'Aceptar',
              handler:_=> resolve(true)
              }
            ]
            }).present();
          })
          }
}
