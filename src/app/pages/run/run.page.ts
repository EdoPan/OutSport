import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-run',
  templateUrl: './run.page.html',
  styleUrls: ['./run.page.scss'],
})
export class RunPage implements OnInit {

  disableBackButton;
  disableButton;
  interval;
  time = new Date(null);
  date = new Date();
  db = firebase.firestore();

  constructor( public alertController: AlertController, private nav: NavController ) { }

  ngOnInit() {
  }

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
            this.db.collection('workouts').doc().set({
              email: firebase.auth().currentUser.email,
              sport: 'run',
              date: this.date,
              time: this.interval,
            });
            this.nav.navigateForward( ['tabs'] );
          }
        },
        {
          text: 'Discard',
          role: 'cancel',
          handler: () => {
            this.nav.navigateForward( ['tabs'] );
          }
        }
      ]
    });
    await alert.present();
    this.disableButton = false;
  }



}
