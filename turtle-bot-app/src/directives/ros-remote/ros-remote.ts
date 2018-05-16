import { TurtlebotService } from './../../providers';
import { JoystickMoveEventArgs } from './../../components/joystick/joystick';
import { Directive, HostListener, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';

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
  private isConnected: boolean;
  
  constructor(
    private turtlebotService: TurtlebotService
  ) {
  }
  // 'ws://192.168.146.129:9090';
  ngOnInit(): void {
    // this.connect();
  }
  ngOnDestroy(): void {
  }

  @HostListener('startMove') joystickStartMove() {
  }

  @HostListener('move') joystickMove(data: JoystickMoveEventArgs) {

  }


}
