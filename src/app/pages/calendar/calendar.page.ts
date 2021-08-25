import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor() { }

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

}
