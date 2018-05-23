import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
// Components
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { InicioPage } from '../pages/inicio/inicio';
import { TipoPage } from '../pages/tipo/tipo';
import { UbicacionPage } from '../pages/ubicacion/ubicacion';
import { EnviadoPage } from '../pages/enviado/enviado';
import { DetalleTipoPage } from '../pages/detalle-tipo/detalle-tipo';
import { BtnBackComponent } from '../components/btn-back/btn-back';

// importacion de libreria para uso de protocolo HTTP
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// importacion de Forms Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// storage
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    SignupPage,
    InicioPage,
    TipoPage,
    DetalleTipoPage,
    UbicacionPage,
    EnviadoPage,
    BtnBackComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    SignupPage,
    InicioPage,
    TipoPage,
    DetalleTipoPage,
    UbicacionPage,
    EnviadoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CallNumber
  ]
})
export class AppModule {}
