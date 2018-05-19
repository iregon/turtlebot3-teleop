import { Injectable } from '@angular/core';
import { AlertController, Alert, AlertOptions } from 'ionic-angular';

@Injectable()
export class AlertService {

    constructor(
        private alertCtrl: AlertController
    ) { }

    createAlert(opts: AlertOptions){
        return this.alertCtrl.create(opts);
    }
    createErrorAlert(options: {title?: string, subtitle?: string, message?: string}): Alert {
        return this.alertCtrl.create({
            title: options.title || 'Error' ,
            subTitle: options.subtitle,
            message: options.message || 'An error occured',
            buttons: ['OK'],
            cssClass: 'error-alert'
        });
    }
    
    show(alert: Alert) {
        alert.present();
    }
}
