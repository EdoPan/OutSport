import {Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import {AlertController, Platform, ToastController} from '@ionic/angular';
import { Workout } from '../../model/workout.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  workouts: Workout[] = [];

  newWorkout: Workout = <Workout>{};

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController,
              private alertController: AlertController) {
    this.plt.ready().then(() => {
      this.loadWorkouts();
    });
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.loadWorkouts();
  }

  //Read (cRud)
  loadWorkouts(){
    this.storageService.getWorkouts().then(workouts =>{
      this.workouts = workouts;
    });
  }

  //Create (Crud)
  addWorkout() {
    this.storageService.addWorkout(this.newWorkout).then(workout => {
      this.newWorkout = <Workout>{};
      this.showToast('Workout added');
      this.loadWorkouts();
    });
  }

  //Mostra il messaggio passato per parametro a schermo
  async showToast( msg ){
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  //Delete (cruD)
  deleteWorkout( workout: Workout ){
    this.storageService.deleteWorkout( workout.date ).then(() => {
      this.showToast('Workout removed');
      this.loadWorkouts();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Where does my data go?',
      message: 'All the data collected during workouts is stored on the storage of your device so be very carefull on what you delete!',
      buttons: [
        {
          text: 'Ok',
        },
      ]
    });
    await alert.present();
  }
}


