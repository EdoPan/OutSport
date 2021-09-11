import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, NavController} from '@ionic/angular';
import {User} from '../../model/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User = <User>{};

  validationFormUser: FormGroup;
  db = firebase.firestore(); //Creo un'istanza del DB
  newUser: User = <User>{};

  validationMessages = {
    age: [
      {type: 'required', message: 'Enter a valid value'},
      {type:'minlength', message: 'Age must be at least 2 character'}
    ],
    height: [
      {type: 'required', message: 'Enter a valid value'},
      {type:'minlength', message: 'Age must be at least 3 character'}
    ],
    weight: [
      {type: 'required', message: 'Enter a valid value'},
      {type:'minlength', message: 'Age must be at least 2 character'}
    ]
  };

  constructor( private router: Router,
               private alertController: AlertController,
               private nav: NavController,
               private userStorage: UserService) {
    this.userStorage.getUser( firebase.auth().currentUser.email ).then((user: User) => {
      this.user = user;
    });
  }

  async saveData() {
    this.newUser.email = firebase.auth().currentUser.email;
    this.newUser.gender = this.validationFormUser.value.gender;
    this.newUser.age = this.validationFormUser.value.age;
    this.newUser.weight = this.validationFormUser.value.weight;
    this.newUser.height = this.validationFormUser.value.height;
    this.userStorage.uptdateDataUser( this.newUser ).then(() => {
      this.newUser = <User>{};
    });

    const alert = await this.alertController.create({
      header: 'Recorded data',
      message: 'Data were recorded in the database',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //this.nav.navigateForward( ['tabs'] );
          }
        },
      ]
    });
    await alert.present();
  }

  ngOnInit() {
    this.validationFormUser = new FormGroup({
      gender: new FormControl(''),
      age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(14),
        Validators.max(95)])),
      height: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(100),
        Validators.max(300)])),
      weight: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(45),
        Validators.max(150)]))
    });
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

}
