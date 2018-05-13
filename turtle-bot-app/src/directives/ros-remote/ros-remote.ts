import { JoystickMoveEventArgs } from './../../components/joystick/joystick';
import { Directive, HostListener, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { RosService } from '../../providers/ros/ros.service';

/**
 * Generated class for the RosRemoteDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[ros-remote]', // Attribute selector
  providers: [RosService]
})
export class RosRemoteDirective implements OnInit, OnDestroy {
  private isConnected: boolean;
  
  constructor(private ros: RosService) {
  }
  // 'ws://192.168.146.129:9090';
  ngOnInit(): void {
    // this.connect();
  }
  ngOnDestroy(): void {
    this.disconnect();
  }

  @HostListener('startMove') joystickStartMove() {
    this.disconnect();
  }

  @HostListener('move') joystickMove(data: JoystickMoveEventArgs) {

  }

  private connect() {
    // if (!this.isConnected)
    //   this.ros.connect()
    //     .subscribe(
    //       () => { this.isConnected = true; console.log('connected') },
    //       error => console.log('Impossibile connettersi', error)
    //     );
  }

  private disconnect() {
    // if (this.isConnected)
      this.ros.disconnect();
  }


}
