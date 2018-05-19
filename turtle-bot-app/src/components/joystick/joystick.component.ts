import { JoystickMovement } from './../../models';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as nippleJs from 'nipplejs';

/**
 * Generated class for the JoystickComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.html'
})
export class JoystickComponent implements OnInit {
  @ViewChild('joystick') private joystick: ElementRef;

  @Input() private position: { top: string, left: string } = { top: '50%', left: '50%' };
  @Input() private color: string = 'red';

  @Output('startMove') private startMove: EventEmitter<void> = new EventEmitter(true);
  @Output('endMove') private endMove: EventEmitter<void> = new EventEmitter(true);
  @Output('move') private move: EventEmitter<JoystickMovement> = new EventEmitter(true);
  // https://github.com/yoannmoinet/nipplejs#events
  
  ngOnInit(): void {
    let manager = nippleJs.create({
      zone: this.joystick.nativeElement,
      mode: 'static',
      color: this.color,
      position: this.position
    });
    manager.on('start', () => this.startMove.emit());
    manager.on('end', () => this.endMove.emit());
    manager.on('move', (event, args: JoystickMovement) => this.move.emit(args));
  }
  constructor() { }
}