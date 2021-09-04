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

  validationFormUser: FormGroup;
  db = firebase.firestore(); //Creo un'istanza del DB
  newUser: User = <User>{};

  validationMessages = {
    gender: [
      {type: 'required',message:'Enter a valid value'},
      {type:'pattern', meesage:'Please the Email Entered is Incorrect. Try again..'}
    ],
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
               private userStorage: UserService) {}

  async saveData() {
    this.newUser.email = firebase.auth().currentUser.email;
    this.newUser.gender = this.validationFormUser.value.gender;
    this.newUser.age = this.validationFormUser.value.age;
    this.newUser.weight = this.validationFormUser.value.height;
    this.newUser.height = this.validationFormUser.value.weight;
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
      gender: new FormControl('', Validators.compose([
        Validators.required/*,
        Validators.pattern('male'),
        Validators.pattern('female'),
        Validators.pattern('Male'),
        Validators.pattern('Female')*/])),
      age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(3)])),
      height: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.max(300)])),
      weight: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.max(150)]))
    });
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

}
