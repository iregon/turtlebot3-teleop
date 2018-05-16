import { TurtlebotMessage } from './../../models/turtlebot-message';
import { Settings } from './../../providers';
import { Ros, Topic } from 'roslib';
import { Injectable } from '@angular/core';

@Injectable()
export class TurtlebotService {
    private ros: Ros;
    private topic: Topic;
    private settings: { url: string, name: string, messageType: string };

    constructor(
        private settingsService: Settings
    ) {
        this.ros = new Ros(null);
        this.settingsService.getValue("turtlebot")
          .then((settings) => this.settings = settings);
    }

    connect() {
        return new Promise((resolve, reject) => {
          this.ros.on('connection', resolve);
          this.ros.on('error', reject);
          this.ros.connect(this.settings.url);
        });
      }
    
      disconnect(): void {
        this.ros.close();
      }
    
      send(message: TurtlebotMessage) {
        this.ensureTopic();
        this.topic.publish(message);
      }
    
      /** Ensure an instance of Topic is available */
      private ensureTopic() {
        if (!this.topic)
          this.topic = new Topic({
            ros: this.ros,
            name: this.settings.name,
            messageType: this.settings.messageType
          });
      }

}
