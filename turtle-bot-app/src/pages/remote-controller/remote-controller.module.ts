// import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemoteControllerPage } from './remote-controller';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    RemoteControllerPage,
  ],
  imports: [
    ComponentsModule,
    // DirectivesModule,
    IonicPageModule.forChild(RemoteControllerPage),
  ],
  exports: [
    RemoteControllerPage
  ],
})
export class RemoteControllerPageModule { }
