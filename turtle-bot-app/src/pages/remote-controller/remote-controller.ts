import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { TurtlebotService, AlertService } from '../../providers/';

/**
 * Generated class for the RemoteControllerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remote-controller',
  templateUrl: 'remote-controller.html',
})
export class RemoteControllerPage {
  readonly title = 'TurtleBot Controller';

  private isConnected: boolean;
  private loader: Loading;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private turtlebotService: TurtlebotService,
    private alertService: AlertService, ) {
  }

  ngOnInit(): void {
    this.turtlebotService.onDisconnect()
      .subscribe(this.onDisconnect);
    this.connect();
  }
  ngOnDestroy(): void {
    if (this.isConnected)
      this.turtlebotService.disconnect();
  }

  private connect() {
    this.showLoader();
    this.turtlebotService.connect()
      .then(() => {
        console.log('connected');
        
        this.isConnected = true;
        this.loader.dismiss();
      })
      .catch(error => {
        this.loader.dismiss();
        this.alertService.createErrorAlert({
          message: error.message ||
            `Can not establish a connection with the server`
        }).present();
      });
  }

  private showLoader() {
    this.loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Connection in progress...'
    });
    this.loader.present();
  }

  private onDisconnect(event: any) {
    this.isConnected = false;
    console.log('disconnected');
    
  }
}
