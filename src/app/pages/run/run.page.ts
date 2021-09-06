import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import { WorkoutService } from '../../services/workout.service';
import firebase from 'firebase';
import { Workout } from '../../model/workout.model';
import {User} from '../../model/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.page.html',
  styleUrls: ['./run.page.scss'],
})
export class RunPage implements OnInit {

  disableBackButton;
  disableStartButton;
  disablePauseButton;
  disableStopButton = true;
  interval;
  inter = 0;//intervallo per il database
  startTime: number;
  endTime: number;
  time = new Date(null);
  newWorkout: Workout = <Workout>{};

  constructor(private storageService: WorkoutService,
              public alertController: AlertController,
              private nav: NavController,
              private userStorage: UserService) { }

  ngOnInit() {}

  startTimer() {
    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1 );
    }, 1000);

    this.startTime = Date.now();

    this.disableStartButton = true;
    this.disablePauseButton = false;
    this.disableBackButton = true;
    this.disableStopButton = false;
  }

  pauseTimer() {
    clearInterval(this.interval);

    this.endTime = Date.now();
    this.inter = this.endTime - this.startTime;

    this.disableStartButton = false;
    this.disablePauseButton = true;
    this.disableBackButton = true;
  }

  async stopActivity() {
    clearInterval(this.interval);

    if (this.disablePauseButton){
      this.inter = this.endTime - this.startTime;
    }
    else {
      this.endTime = Date.now();
      this.inter = this.inter + (this.endTime - this.startTime);
    }

    const alert = await this.alertController.create({
      header: 'Save',
      message: 'Do you want to save the workout?',
      buttons: [
        {
          text: 'Save',
          handler: (res) => {
            this.newWorkout.email = firebase.auth().currentUser.email;
            this.newWorkout.sport = 'Run';
            this.newWorkout.date = Date.now();

            //PER MEMORIZZARE I DATI IN UN FORMATO: "ORE":"MINUTI":"SECONDI"
            const hours = Math.floor((this.inter/1000)/3600);
            const minutes = Math.floor((((this.inter/1000)/3600)-hours)*60);
            const seconds = Math.floor((((((this.inter/1000)/3600)-hours)*60)-minutes)*60);
            this.newWorkout.time = String(hours).concat('h:').concat(String(minutes)).concat('m:').concat(String(seconds)).concat('s');

            const today = new Date().toDateString();
            this.newWorkout.dateDatabase = today;

            this.newWorkout.distance = res.Distance;

            this.calculatesCalories(this.inter);

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
      inputs: [
        {
          name: 'Distance',
          type: 'number',
          min: 0,
          id: 'distance',
          placeholder: 'Distance (km)'
        }
      ]
    });
    await alert.present();
    this.disableStartButton = false;
  }

  async calculatesCalories( interv: number ){
    let userWeight: number;
    this.userStorage.getUser( firebase.auth().currentUser.email ).then((user: User) => {
      userWeight = user.weight;
      const KCAL_RUN = 8;//valore medio (possibili diverse velocità)
      const hours = (interv/1000)/3600;
      if ( userWeight > 0) {
        this.newWorkout.calories = Math.ceil((KCAL_RUN * userWeight)*hours);
      }
    });
  }

}
