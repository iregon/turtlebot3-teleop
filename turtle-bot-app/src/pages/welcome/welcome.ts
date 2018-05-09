import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Ros, Topic, Message } from 'roslib';
import { Observable } from 'rxjs';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) { }

  async login() {
    let ros = new Ros({
      url: 'ws://192.168.146.128:9090'
    });
    await this.connect(ros)
      .then(() => this.connected(ros))
      .catch((error) => console.log('Error to connect to websocket server: ', error));
  }

  private connect(ros: Ros): Promise<{}> {
    return new Promise((resolve, reject) => {
      ros.on('connection', resolve);
      ros.on('error', reject);
      
    })
  }

  private connected(ros: Ros) {
    console.log('Connected to websocket server.');
    let cmdVel = new Topic({
      ros: ros,
      name: '/turtle1/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });
    cmdVel.subscribe((message) => console.log('Received message on ' + cmdVel.name + ': ' + message))
    let twist = new Message({
      linear: {
        x: 0.5,
        y: 0.0,
        z: 0.0
      },
      angular: {
        x: 0.0,
        y: 0.0,
        z: 0.0
      }
    });
    cmdVel.publish(twist);
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
