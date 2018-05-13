import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ros } from 'roslib';

/*
  Generated class for the RosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RosService {

  url: string;
  autoReconnect: boolean = true;
  attempts: number = 5;

  private ros: Ros;
  private currentAttempt = 0;
  private tryToConnect: boolean;

  constructor() {
    this.ros = new Ros(null);
  }

  /** Connect to ros server
   * @param
   * options:
   * url: ros server url
   * autoReconnect: default true - automatically retry to connect to the server
   * attempts: default 5 - max numbers of try to reconnect
   */
  connect(options: {
    url?: string
    autoReconnect?: boolean
    attempts?: number
  }): Observable<void> {
    this.url = this.url;
    this.autoReconnect = options.autoReconnect;
    this.attempts = options.attempts;
    this.tryToConnect = true;

    this.ros.connect(this.url);
    return Observable.create((observer: Observer<void>) => {
      this.ros.on('connection', () => {
        observer.next(null);
        observer.complete();
      });
      this.ros.on('error', (error) => observer.error(error));
    });
  }

  disconnect(): void {
    this.tryToConnect = false;
    this.ros.close();
  }



  //   await this.connect(ros)
  //     .then(() => this.connected(ros))
  //     .catch((error) => console.log('Error to connect to websocket server: ', error));
  // }

  // private connect(ros: Ros): Promise<{}> {
  //   return new Promise((resolve, reject) => {
  //     ros.on('connection', resolve);
  //     ros.on('error', reject);

  //   })
  // }

  // private connected(ros: Ros) {
  //   console.log('Connected to websocket server.');
  //   let cmdVel = new Topic({
  //     ros: ros,
  //     name: '/turtle1/cmd_vel',
  //     messageType: 'geometry_msgs/Twist'
  //   });
  //   cmdVel.subscribe((message) => console.log('Received message on ' + cmdVel.name + ': ' + message))
  //   let twist = new Message({
  //     linear: {
  //       x: 0.5,
  //       y: 0.0,
  //       z: 0.0
  //     },
  //     angular: {
  //       x: 0.0,
  //       y: 0.0,
  //       z: 0.0
  //     }
  //   });
  //   cmdVel.publish(twist);
  // }
}
