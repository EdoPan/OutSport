import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import { WorkoutService } from '../../services/workout.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Workout } from '../../model/workout.model';

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
  inter = 0;//intervallo per il database
  startTime: number;
  endTime: number;
  time = new Date(null);
  newWorkout: Workout = <Workout>{};

  constructor(private storageService: WorkoutService, private alertController: AlertController, private nav: NavController ) { }

  ngOnInit() {}

  startTimer() {
    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1 );
    }, 1000);

    this.startTime = Date.now();

    this.disableStartButton = true;
    this.disableBackButton = true;
    this.disableStopButton = false;
  }

  pauseTimer() {
    clearInterval(this.interval);

    this.endTime = Date.now();
    this.inter = this.endTime - this.startTime;

    this.disableStartButton = false;
  }

  async stopActivity() {
    clearInterval(this.interval);

    this.endTime = Date.now();
    this.inter = this.inter + (this.endTime - this.startTime);

    const alert = await this.alertController.create({
      header: 'Save',
      message: 'Do you want to save the workout?',
      inputs: [
        {
          name: 'Distance',
          type: 'number',
          min: 0,
          id: 'distance',
        }
      ],
      buttons: [
        {
          text: 'Save',
          handler: (res) => {
            this.newWorkout.email = firebase.auth().currentUser.email;
            this.newWorkout.sport = 'Bike';
            this.newWorkout.date = Date.now();

            //PER MEMORIZZARE I DATI IN UN FORMATO: "ORE":"MINUTI":"SECONDI"
            const hours = Math.floor((this.inter/1000)/3600);
            const minutes = Math.floor((((this.inter/1000)/3600)-hours)*60);
            const seconds = Math.floor((((((this.inter/1000)/3600)-hours)*60)-minutes)*60);
            this.newWorkout.time = String(hours).concat('h:').concat(String(minutes)).concat('m:').concat(String(seconds)).concat('s');

            const today = new Date().toDateString();
            this.newWorkout.dateDatabase = today;

            this.newWorkout.distance = res.Distance;

            this.storageService.addWorkout( this.newWorkout );
            this.nav.navigateForward( ['tabs'] );
          }
        },
        {
          text: 'Discard',
          handler: () => {
            this.nav.navigateForward( ['tabs'] );
          }
        }
      ],
    });
    await alert.present();
    this.disableStartButton = false;
  }

}
