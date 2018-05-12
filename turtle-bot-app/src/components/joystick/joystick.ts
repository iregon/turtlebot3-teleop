import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as nippleJs from 'nipplejs';

/**
 * Generated class for the JoystickComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'trtl-joystick',
  templateUrl: 'joystick.html'
})
export class JoystickComponent implements OnInit {
  @Input() private position: { top: string, left: string } = { top: '80%', left: '50%' };
  @Input() private color: string = 'red';

  @Output('startMove') private startMove: EventEmitter<void> = new EventEmitter(true);
  @Output('endMove') private endMove: EventEmitter<void> = new EventEmitter(true);
  @Output('move') private move: EventEmitter<JoystickMoveEventArgs> = new EventEmitter(true);
  // https://github.com/yoannmoinet/nipplejs#events
  
  ngOnInit(): void {
    let manager = nippleJs.create({
      mode: 'static',
      color: this.color,
      position: this.position
    });
    manager.on('start', () => this.startMove.emit());
    manager.on('end', () => this.endMove.emit());
    manager.on('move', (event, args: JoystickMoveEventArgs) => this.move.emit(args));
  }
  constructor() { }
}

export class JoystickMoveEventArgs {
  /** the identifier of the touch/mouse that triggered it*/
  identifier: number;
  /** absolute position of the center in pixels */
  position: {
    x: number,
    y: number
  };
  /** strength in % */
  force: number;
  /** distance from center in pixels*/
  distance: number;
  /** the pressure applied by the touch */
  pressure: number;
  angle: {
    /** angle in radian */
    radian: number,
    /** angle in degree */
    degree: number
  };
  /** the joystick instance that triggered the event */
  instance: any

  constructor() { }
}
