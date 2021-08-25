import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private nav: NavController ) {}

  gotoLoginpage(){
    this.nav.navigateForward( ['login'] );
  }

  registerUser(){
    this.nav.navigateForward( ['signup'] );
  }

}
