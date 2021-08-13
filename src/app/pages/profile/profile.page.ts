import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( private nav: NavController ) { }

  ngOnInit() {
  }

  goToCalendarPage(){
    this.nav.navigateForward( ['calendar'] );
  }

  goToTabsPage(){
    this.nav.navigateForward( ['tabs'] );
  }
}
