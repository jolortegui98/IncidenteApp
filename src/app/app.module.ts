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
import { ForgotPage } from '../pages/forgot/forgot';
import { DetailsPage } from '../pages/details/details';
import { HistorialPage } from '../pages/historial/historial';
import { LocacionesPage } from '../pages/locaciones/locaciones';

// importacion de libreria para uso de protocolo HTTP
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// importacion de Forms Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// storage
import { IonicStorageModule } from '@ionic/storage';
// callNumber
import { CallNumber } from '@ionic-native/call-number';
import { ConnectivityService } from '../providers/network/connectivity-service';

// diagnostic y open native
import { Diagnostic } from '@ionic-native/diagnostic';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

// geolocation
import { Geolocation } from '@ionic-native/geolocation';

// imports de camara
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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
    BtnBackComponent,
    ForgotPage,
    DetailsPage,
    HistorialPage,
    LocacionesPage
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
    EnviadoPage,
    ForgotPage,
    DetailsPage,
    HistorialPage,
    LocacionesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CallNumber,
    ConnectivityService,
    Diagnostic,
    OpenNativeSettings,
    Geolocation,
    Camera, 
    FileTransfer,
    File
  ]
})
export class AppModule {}
