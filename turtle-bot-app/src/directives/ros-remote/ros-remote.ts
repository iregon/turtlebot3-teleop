import { JoystickMovement, TurtlebotMessage } from './../../models';
import { Settings } from './../../providers/settings/settings';
import { Observable, Subscription, Observer, Subject, BehaviorSubject } from 'rxjs';
import { AlertService } from './../../providers/alert/alert.service';
import { TurtlebotService } from './../../providers';
import { Directive, HostListener, AfterViewInit, OnInit, OnDestroy, ElementRef, Inject, Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

/**
 * Generated class for the RosRemoteDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[ros-remote]', // Attribute selector
  providers: [TurtlebotService]
})
export class RosRemoteDirective implements OnInit, OnDestroy {
  private readonly TIME_INTERVAL: number;
  private readonly messageFactory: TurtleBotMessageFactory;
  private isConnected: boolean;
  private loader: Loading;
  private timer: Subscription;
  private movement: JoystickMovement;
  // private lastMovement: JoystickMovement;

  constructor(
    private settingService: Settings,
    private loadingCtrl: LoadingController,
    private turtlebotService: TurtlebotService,
    private alertService: AlertService,
  ) {
    this.TIME_INTERVAL = this.settingService.getValue('remoteInterval');
    this.messageFactory = new TurtleBotMessageFactory(settingService);
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

  @HostListener('startMove') joystickStartMove() {
    if (!this.isConnected) this.connect();
    this.timer = Observable.interval(this.TIME_INTERVAL)
      .map(() => this.movement)
      .subscribe(m => this.turtlebotService.send(
        this.messageFactory.create(m)));
  }

  @HostListener('move', ['$event']) joystickMove(data: any) {
    this.movement = data;
  }

  @HostListener('endMove') joystickEndMove() {
    this.timer.unsubscribe();
  }

  private connect() {
    this.showLoader();
    this.turtlebotService.connect()
      .then(() => {
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
  }

  // private createMessage(data: JoystickMovement): TurtlebotMessage {
  //   console.log(data.angle.degree);

  //   let speed = new SpeedStrategy(this.settingService).calculateSpeed(data.force);
  //   let angle = new AngleStrategy().calculateAngle(data.angle.radian);

  //   if (this.lastMovement == null) return new TurtlebotMessage({
  //     linear: {
  //       x: speed
  //     },
  //     angular: {
  //       z: angle
  //     }
  //   });
  // }

}

class TurtleBotMessageFactory {
  private speedStrategy: SpeedStrategy;
  private angleStrategy: AngleStrategy;

  constructor(settingsService: Settings) {
    this.speedStrategy = new SpeedStrategy(settingsService);
    this.angleStrategy = new AngleStrategy();
  }

  create(data: JoystickMovement): TurtlebotMessage {
    console.log('angle radian', data.angle.radian);

    let speed = this.speedStrategy.calculateSpeed(data.force);
    let angle = this.angleStrategy.calculateAngle(data.angle.radian);

    return new TurtlebotMessage({
      linear: {
        x: speed
      },
      angular: {
        z: angle
      }
    });
  }
}

class SpeedStrategy {
  private readonly MAX_FORCE: number = 20;
  private readonly MAX_SPEED: number;

  constructor(private settingsService: Settings) {
    this.MAX_SPEED = this.settingsService.getValue('maxSpeed');
  }

  calculateSpeed(force: number): number {
    if (force > this.MAX_FORCE) force = this.MAX_FORCE;

    return force / this.MAX_FORCE * this.MAX_SPEED;
  }
}

class AngleStrategy {
  private readonly DEGREE_360 = 2 * Math.PI;
  private readonly DEGREE_180 = Math.PI;
  private readonly DEGREE_90 = Math.PI / 2;
  private lastAngle: number;

  /** Calculate angle in radian based on joystick angle */
  calculateAngle(angle: number) {
    angle -= this.DEGREE_90;
    let newAngle = angle;
    if (this.lastAngle != 0)
      newAngle -= this.lastAngle;
    this.lastAngle = angle;

    return this.translateToPI(newAngle);
  }

  /** Translate a 2π angle to a -/+ π angle*/
  private translateToPI(angle: number) {
    if (angle > this.DEGREE_180) return this.DEGREE_360 - angle;
    if (angle < (- this.DEGREE_180)) return this.DEGREE_360 + angle;
    return angle;
  }
}