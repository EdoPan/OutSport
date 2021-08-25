import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.page.html',
  styleUrls: ['./bike.page.scss'],
})
export class BikePage implements OnInit {

  disableBackButton;
  disableStartButton;
  disableStopButton = true;
  interval;
  time = new Date(null);
  date = new Date();
  db = firebase.firestore();

  constructor( private alertController: AlertController, private nav: NavController ) { }

  ngOnInit() {
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1 );
    }, 1000);
    this.disableStartButton = true;
    this.disableBackButton = true;
    this.disableStopButton = false;
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.disableStartButton = false;
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
            this.db.collection('workouts').doc().set({
              email: firebase.auth().currentUser.email,
              sport: 'bike',
              date: this.date,
              time: this.interval,
            });
            this.nav.navigateForward( ['tabs'] );
          }
        },
        {
          text: 'Discard',
          handler: () => {
            this.nav.navigateForward( ['tabs'] );
          }
        }
      ]
    });
    await alert.present();
    this.disableStartButton = false;
  }

}
