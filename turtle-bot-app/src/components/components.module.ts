import { NgModule } from '@angular/core';
import { JoystickComponent } from './joystick/joystick';
import { RemoteControllerComponent } from './remote-controller/remote-controller';
@NgModule({
	declarations: [JoystickComponent,
    RemoteControllerComponent],
	imports: [],
	exports: [JoystickComponent,
    RemoteControllerComponent]
})
export class ComponentsModule {}
