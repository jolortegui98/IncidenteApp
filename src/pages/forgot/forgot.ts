import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL } from './../../utils/variables';
import { ConnectivityService  } from '../../providers/network/connectivity-service';

// importar alerta de ionic
import { AlertController } from 'ionic-angular';

// importar signin
import { SigninPage } from '../signin/signin';

// storage post
import { Storage } from '@ionic/storage';

//forgot implementation
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
  providers: [ConnectivityService]
})

export class ForgotPage implements OnInit {

    user: FormGroup;

    // injecciones de modulos
    constructor(
      public navCtrl: NavController,
      public http: Http,
      public alertCtrl: AlertController,
      public storage: Storage,
      public connectivityService: ConnectivityService
    ) {}

    ngOnInit() {
        this.user = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            re_password: new FormControl('', [Validators.required, this.equalto('password')])
        });
    }

    onSubmit(){
      // prepare Headers to post
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers });

      // prepare json to post
      let json = {
        email: this.user.get('email').value,
        password1: this.user.get('password').value,
        password2: this.user.get('re_password').value
      }

      let mandado = JSON.stringify(json);
      console.log(mandado);
      //let jsonPretty = JSON.stringify(JSON.parse(json),null,2);

      /*console.log("Json a enviar email "+ this.json.get('email').value);
      console.log("Json a enviar password "+ json.get('password').value);
      console.log("Json a enviar re_password "+ json.get('re_password').value);
      */

      this.http.post(`${URL}/login/reset`, json, options)
      .subscribe(data => {
        console.log(data['_body']);
        let data_resp = data.json();
        if (data_resp.success) {
          this.alertCtrl.create({
            title: 'Exito!',
            subTitle: data_resp.mensaje,
            buttons: ['OK']
          }).present();
          this.navCtrl.push(SigninPage, {});
        } else {
          this.alertCtrl.create({
            title: 'Error!',
            subTitle: data_resp.mensaje,
            buttons: ['OK']
          }).present();
          // refresca para que vuelva a ingresar
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }
      }, error => {
        console.log("Error forgot "+ error);  
        //this.connectivityService.offline();
      });
  }

    equalto(field_name): ValidatorFn {
        return (control: AbstractControl): {
            [key: string]: any
        } => {

            let input = control.value;

            let isValid = control.root.value[field_name] == input
            if (!isValid)
                return {
                    'equalTo': {
                        isValid
                    }
                }
            else
                return null;
        };
    }


}