import { Observable, Observer } from 'rxjs';
import { TurtlebotMessage } from './../../models/turtlebot-message';
import { Settings } from './../../providers';
import { Ros, Topic, Message } from 'roslib';
import { Injectable } from '@angular/core';
import { TurtlebotSettings, TopicSettings } from '../../models';

@Injectable()
export class TurtlebotService {
  private readonly NO_VIDEO_IMG = './assets/img/no-video.jpg';
  private ros: Ros;
  private command: Topic;
  private cam: Topic;
  private settings: TurtlebotSettings

  constructor(
    private settingsService: Settings
  ) {
    this.ros = new Ros(null);
    this.settings = this.settingsService.getValue("turtlebot");
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ros.on('connection', resolve);
      this.ros.on('error', reject);
      this.ros.connect(`ws://${this.settings.url}`);
    });
  }

  disconnect(): void {
    this.ros.close();
  }

  send(message: TurtlebotMessage) {
    if (!this.command)
      this.command = this.createTopic(this.settings.remoteController);
    this.command.publish(message);
  }

  onDisconnect(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.ros.on('close', event => observer.next(event))
    });
  }

  getCamStream(): Observable<string> {
    let img = '';
    if (!this.cam)
      this.cam = this.createTopic(this.settings.cam);

    let stream: Observable<string> = Observable.create(observer => {
      this.cam.subscribe((message: any) => observer.next(`data:image/jpeg;base64,${message.data}`));
    });

    // Observable.timer(0, 200)
    // .ma
    // .switchMapTo(stream)
    // .map(v => console.log(v));
    // return stream;
    // return Observable.race(
    //   Observable.timer(0, 2000)
    //   stream
    // )


    // Observable.timer(0, 2000)
    // .mapTo(this.NO_VIDEO_IMG),
    // stream,
    // (d, s) => s || d
    // )
    return Observable.merge(
      Observable.timer(0, 2000)
      .mapTo(this.NO_VIDEO_IMG),
      stream
    )
    .distinctUntilChanged();
    
    // return Observable.race(
    //   Observable.timer(0, 2000)
    //   .mapTo(this.NO_VIDEO_IMG),
    //   stream.defaultIfEmpty()
    // .distinctUntilChanged();

    // Observable.ra
    // return Observable.timer(0, 2000)
    // .switchMap(() => stream)
    // .distinctUntilChanged()
  }

  // getCamUrl(): string{
  //   return this.settings.cam;
  // }

  /** Ensure an instance of Topic is available */
  private createTopic(settings: TopicSettings) {
    return new Topic({
      ros: this.ros,
      name: settings.name,
      messageType: settings.messageType
    });
  }

}
