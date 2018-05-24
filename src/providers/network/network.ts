// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from "@ionic-native/network";
import { ToastController } from "ionic-angular";
import { Subscription } from "rxjs";
import { mergeScan } from "rxjs/operator/mergeScan";


@Injectable()
export class NetworkProvider {
  // var
  private disconnectSubscription: Subscription;
  private connectionSubscription: Subscription;

  constructor(
    // public http: HttpClient
    private network: Network,
    private toastController: ToastController
  ) {}

  getConnectionType() {
    console.log(this.network.type);
    return this.network.type;
  }

  subscribe() {
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.showToast('Disconnection Detected.');
    });

    this.connectionSubscription = this.network.onConnect().subscribe(() => {
      this.showToast('Connection Detected.');
    })
  }

  unsubscribe() {
    this.connectionSubscription.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }

  showToast(message) {
    const toast = this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
