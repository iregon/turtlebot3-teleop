import { RemoteControllerPage } from './remote-controller/remote-controller';
import { PageList } from './../models';
// The page the user lands on after opening the app and without a session
export const FirstRunPage = 'RemoteControllerPage';

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = 'TabsPage';

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = 'ListMasterPage';
export const Tab2Root = 'SearchPage';
export const Tab3Root = 'SettingsPage';

export const Pages: PageList = [
    { title: 'TurtleBot Controller', component: RemoteControllerPage.name, icon: 'game-controller-a' }
];