import { Component, OnInit, ViewChild  } from '@angular/core';
import {AlertController, IonInfiniteScroll} from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // Logica dell'applicazione per determinare se tutti
      // i dati sono caricati e disabilitare lo scorrimento infinito
      // @ts-ignore
      if (data.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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
