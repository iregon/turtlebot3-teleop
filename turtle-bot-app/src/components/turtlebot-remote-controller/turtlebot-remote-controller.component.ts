import { Subscription, Observable } from 'rxjs';
import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import * as nippleJs from 'nipplejs';

import { TurtlebotService, Settings } from './../../providers';
import { TurtleBotMessageFactory, JoystickMovement } from '../../models';
// https://github.com/yoannmoinet/nipplejs#events

/**
 * Generated class for the TurtlebotRemoteControllerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'trtl-remote-controller',
  templateUrl: 'turtlebot-remote-controller.html'
})
export class TurtlebotRemoteControllerComponent implements OnInit {
  @ViewChild('joystick') private joystick: ElementRef;
  @Input() private color: string = 'red';

  private readonly TIME_INTERVAL: number;
  private readonly messageFactory: TurtleBotMessageFactory;
  private timer: Subscription;
  private movement: JoystickMovement;

  constructor(
    private settingService: Settings,
    private turtlebotService: TurtlebotService,
  ) {
    this.TIME_INTERVAL = this.settingService.getValue('remoteInterval');
    this.messageFactory = new TurtleBotMessageFactory(settingService);
  }

  ngOnInit(): void {
    let manager = nippleJs.create({
      zone: this.joystick.nativeElement,
      mode: 'static',
      color: this.color,
      position: { top: '50%', left: '50%' }
    });
    manager.on('start', () => this.joystickStartMove());
    manager.on('move', (event, args: JoystickMovement) => this.joystickMove(args));
    manager.on('end', () => this.joystickEndMove());
  }

  private joystickStartMove() {
    this.timer = Observable.timer(0, this.TIME_INTERVAL)
      .map(() => this.movement)
      .subscribe(movement => this.send(movement));
  }

  private joystickMove(data: JoystickMovement) {
    this.movement = data;
  }

  private joystickEndMove() {
    this.timer.unsubscribe();
  }

  private send(movement: JoystickMovement) {
    this.turtlebotService.send(
      this.messageFactory.create(movement));
  }

}
