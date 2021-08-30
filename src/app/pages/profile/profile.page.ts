import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  validationFormUser: FormGroup;
  db = firebase.firestore(); //Creo un'istanza del DB

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

  /*
  constructor( private router: Router, private alertCtrl: AlertController ) {
     const document = this.db.collection('users').doc( firebase.auth().currentUser.email );
     let dataDoc;
     document.get().then((doc) => {
       if (doc.exists) {
         dataDoc = doc.data();
       } else {
         console.log('No such document!');
       }
     }).catch((error) => {
       console.log('Error getting document:', error);
     });

     this.validationFormUser = new FormGroup({
       gender: new FormControl(dataDoc.gender, Validators.required),
       age: new FormControl('', Validators.compose([Validators.minLength(2), Validators.maxLength(2)])),
       height: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(3)])),
       weight: new FormControl('', Validators.compose([Validators.minLength(3), Validators.maxLength(3)]))
     });
   }
  */

  constructor( private router: Router, private alertController: AlertController, private nav: NavController ) {}

  async saveData(){
      this.db.collection('users').doc( firebase.auth().currentUser.email ).update({
      gender: this.validationFormUser.value.gender,
      age: this.validationFormUser.value.age,
      height: this.validationFormUser.value.height,
      weight: this.validationFormUser.value.weight
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
