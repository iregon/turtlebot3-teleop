import { ConfigService } from '../../providers';
import { Injectable, APP_INITIALIZER } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Settings {
  private readonly SETTINGS_KEY: string = 'settings';
  private settings: any;

  constructor(
    private storage: Storage,
    private config: ConfigService
  ) { }

  load() {
    return this.storage.get(this.SETTINGS_KEY).then((value) => {
      if (value) {
        this.settings = value;
        return this.merge(this.defaults());
      } else {
        return this.setAll(this.defaults()).then((val) => {
          this.settings = val;
        })
      }
    });
  }

  private defaults() {
    return this.config.getAll();
  }

  // private mergeDefaults(defaults: any) {
  //   for (let k in defaults) {
  //     if (!(k in this.settings)) {
  //       this.settings[k] = defaults[k];
  //     }
  //   }
  //   return this.setAll(this.settings);
  // }

  merge(settings: any) {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }

  setValue(key: string, value: any) {
    this.settings[key] = value;
    return this.storage.set(this.SETTINGS_KEY, this.settings);
  }

  setAll(value: any) {
    return this.storage.set(this.SETTINGS_KEY, value);
  }

  getValue(key: string) {
    return this.settings[key];
    // return this.storage.get(this.SETTINGS_KEY)
    //   .then(settings => {
    //     return settings[key];
    //   });
  }

  getApi(key: string): string {
    return this.settings["api"][key];
  }

  save() {
    return this.setAll(this.settings);
  }

  get allSettings() {
    return this.settings;
  }
}

export function SettingsFactory(settings: Settings) {
  return () => settings.load();
}
export function init() {
  return {
    provide: APP_INITIALIZER,
    useFactory: SettingsFactory,
    deps: [Settings],
    multi: true
  }
}
const SettingsModule = {
  init: init
}
export { SettingsModule };
