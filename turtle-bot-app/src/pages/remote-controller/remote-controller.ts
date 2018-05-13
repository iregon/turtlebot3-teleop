import { ConfigService } from './../../providers/config/config.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private config: ConfigService) {
      console.log(config.get('API_ENDPOINTS')['USER']);
      
  }

  click() {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad RemoteControllerPage');
  // }

}
