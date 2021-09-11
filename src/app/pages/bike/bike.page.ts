import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import { WorkoutService } from '../../services/workout.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Workout } from '../../model/workout.model';
import {User} from '../../model/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.page.html',
  styleUrls: ['./bike.page.scss'],
})
export class BikePage implements OnInit {

  disableBackButton;
  disableStartButton;
  disablePauseButton;
  disableStopButton = true;
  interval;
  inter;//intervallo per il database (differenza di Date in millisecondi)
  time = new Date(null);
  newWorkout: Workout = <Workout>{};
  trainingInProgress = false;
  id;
  user: User = <User>{};

  constructor(private storageService: WorkoutService,
              private alertController: AlertController,
              private nav: NavController,
              private userStorage: UserService) {
    this.newWorkout.calories = 0;
    this.disablePauseButton = true;
    this.disableStopButton = true;

    this.userStorage.getUser( firebase.auth().currentUser.email ).then((user: User) => {
      this.user = user;
    });

    this.inter = 0;
    this.id = setInterval(() =>{
      if (this.trainingInProgress === true){//se l'allenamento è in corso
        this.inter = this.inter + 250;
      }
      this.calculatesCalories(this.inter);
    },250);
  }

  ngOnInit() {}

  startTimer() {
    this.trainingInProgress = true;

    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1 );
    }, 1000);

    this.disableStartButton = true;
    this.disablePauseButton = false;
    this.disableBackButton = true;
    this.disableStopButton = false;
  }

  pauseTimer() {
    this.trainingInProgress = false;

    clearInterval(this.interval);

    this.disableStartButton = false;
    this.disablePauseButton = true;
    this.disableBackButton = true;
  }

  async stopActivity() {
    this.trainingInProgress = false;
    clearInterval(this.interval);

    const alert = await this.alertController.create({
      header: 'Save',
      message: 'Do you want to save the workout?',
      inputs: [
        {
          name: 'Distance',
          type: 'number',
          min: 0,
          id: 'distance',
          placeholder: 'Distance (Km)'
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

            if ( res.Distance !== '' ){
              console.log('inserito un valore non nullo in newWorkout.distance');
              this.newWorkout.distance = res.Distance;
              //velocità=spazio/tempo in Km/h
              this.newWorkout.averageSpeed = Math.ceil(((this.newWorkout.distance*1000)/((this.inter/1000)))*3.6);
            } else {
              console.log('inserito un valore nullo in newWorkout.distance');
              this.newWorkout.distance = null;
            }

            this.inter = 0;

            clearInterval(this.id);//per fermare setInteval

            this.storageService.addWorkout( this.newWorkout );
            this.nav.navigateForward( ['tabs'] );
          }
        },
        {
          text: 'Discard',
          handler: () => {
            clearInterval(this.id);//per fermare setInteval

            this.nav.navigateForward( ['tabs'] );
          }
        }
      ],
    });
    await alert.present();
    this.disableStartButton = false;
  }

  async calculatesCalories( interv: number ){
    const KCAL_RUN = 8;//valore medio (possibili diverse velocità)
    const hours = (interv/1000)/3600;
    if ( this.user.weight > 0) {
      this.newWorkout.calories = Math.ceil((KCAL_RUN * this.user.weight)*hours);
    } else {
      this.newWorkout.calories = null;
    }
  }

}
