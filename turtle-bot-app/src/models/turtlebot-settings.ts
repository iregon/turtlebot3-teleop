import { TopicSettings } from './';
export interface TurtlebotSettings {
    url: string;
    remoteController: TopicSettings,
    cam: TopicSettings
    // cam: string
}
