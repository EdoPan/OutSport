import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-bike',
  templateUrl: './bike.page.html',
  styleUrls: ['./bike.page.scss'],
})
export class BikePage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  disableBackButton;
  disableButton;
  interval;
  time = new Date(null);

  startTimer() {
    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1 );
    }, 1000);
    this.disableButton = true;
    this.disableBackButton = true;
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.disableButton = false;
  }

  async stopActivity() {
    clearInterval(this.interval);
    const alert = await this.alertController.create({
      header: 'Save',
      message: 'Do you want to save the workout?',
      buttons: [
        {
          text: 'Save',
          handler: () => {
            //Qui va il metodo per salvare i dati nel database, portarli nel calendario e reindirizzare
            // sulla pagina del calendario (anche questo lo sa fare Marco)
          }
        },
        {
          text: 'Discard',
          role: 'cancel',
          handler: () => {
            //Qui va il metodo per ritornare alla pagina Activities (lo sa fare Marco)
          }
        }
      ]
    });
    await alert.present();
    this.disableButton = false;
  }

}
