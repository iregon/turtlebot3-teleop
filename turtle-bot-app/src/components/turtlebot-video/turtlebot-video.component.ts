import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { TurtlebotService } from '../../providers/';

/**
 * Generated class for the TurtlebotVideoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'trtl-video',
  templateUrl: 'turtlebot-video.html'
})
export class TurtlebotVideoComponent implements OnInit {

  @ViewChild('video') private video: ElementRef;

  constructor(
    private turtlebotService: TurtlebotService
  ) {
  }

  ngOnInit(): void {
    this.turtlebotService.getCamStream()
      .subscribe(stream => this.video.nativeElement.src = stream);
  }
}