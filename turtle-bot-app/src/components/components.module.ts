import { NgModule } from '@angular/core';
import { TurtlebotVideoComponent } from './turtlebot-video/turtlebot-video.component';
import { TurtlebotRemoteControllerComponent } from './turtlebot-remote-controller/turtlebot-remote-controller.component';
@NgModule({
	declarations: [
    TurtlebotVideoComponent,
    TurtlebotRemoteControllerComponent
	],
	imports: [],
	exports: [
    TurtlebotVideoComponent,
    TurtlebotRemoteControllerComponent
	]
})
export class ComponentsModule { }
