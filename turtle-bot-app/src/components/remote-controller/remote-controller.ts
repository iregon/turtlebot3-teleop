import { Observable, Subscription, Observer, Subject } from 'rxjs';
import { JoystickMoveEventArgs } from './../joystick/joystick';
import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';

/**
 * Generated class for the RemoteControllerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'trtl-remote-controller',
  templateUrl: 'remote-controller.html'
})
export class RemoteControllerComponent{

  constructor() {
  }

  joystickMove(data: JoystickMoveEventArgs): void {
    console.log(JSON.stringify(data));

  }

}