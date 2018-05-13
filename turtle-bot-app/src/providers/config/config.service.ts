import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, APP_INITIALIZER } from '@angular/core';
import { ENV } from '@app/env'

/*
  Generated class for the ConfigService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// declare const ENV: string;

@Injectable()
export class ConfigService {
  private readonly CONFIG_PATH = './assets/config';
  private settings: Map<string, object>;
  // private env: string;

  constructor(private http: HttpClient) { }

  load(): Promise<{}>{
    return new Promise((resolve, reject) => {
      // let env = environment.production ? 'production' : 'development';
      console.log(ENV.mode)
      this.http.get(`${this.CONFIG_PATH}/config-${ENV.mode}.json`)
        .subscribe((data: Map<string, object>) => {
          this.settings = data;
          resolve(true);
        },
          (error: any) => {
            return Observable.throw(error || 'No config file found');
          });
    });
  }
  // // Gets API route based on the provided key
  // getApi(key: string): string {
  //   return this.settings["API_ENDPOINTS"][key];
  // }
  // Gets a value of specified property in the configuration file
  get(key: string) {
    return this.settings[key];
  }
  getAll(){
    return this.settings;
  }
}

export function ConfigFactory(config: ConfigService) {
  return () => config.load();
}

export function init() {
  return {
    provide: APP_INITIALIZER,
    useFactory: ConfigFactory,
    deps: [ConfigService],
    multi: true
  }
}

const ConfigModule = {
  init: init
}

export { ConfigModule };