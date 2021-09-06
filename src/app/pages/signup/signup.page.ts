import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertController, NavController} from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {User} from '../../model/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  users: User[] = [];
  newUser: User = <User>{};

  validationMessages = {
    email: [
      {type: 'required',message:'Enter your Email Adress'},
    ],
    password: [
      {type: 'required', message: 'Password is required here'},
      {type:'minlength', message: 'Password must be at least 6 character'}
    ]
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  ValidationFormUser: FormGroup;
  loading: any;

  constructor( private router: Router,
               private formbuilder: FormBuilder,
               private authService: AuthService,
               private alertCtrl: AlertController,
               private navCtr: NavController,
               private userStorage: UserService){}

  ngOnInit() {
    this.ValidationFormUser = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  registerUser(value){
    //this.showalert();
      this.router.navigate(['tabs/activities']);
      try {
        this.authService.userRegistration(value).then(response => {
            console.log(response);
            if (response.user) {
              response.updateProfile({
                email: value.email,
              });
              this.loading.dismiss();
              this.router.navigate(['tabs/activities']);
            }
          }, error => {
            this.loading.dismiss();
            this.errorLoading(error.message);
          }
        );
      } catch (erro) {
        console.log(erro);
      }
  }

  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:'Error Registering',
      message,
      buttons:[{
        text:'ok',
        handler: ()=>{
          this.navCtr.navigateBack(['registration']);
        }
      }]
    });
    await loading.present();
  }

  async showalert(){
    const load = await this.alertCtrl.create({
      message:'Please wait',
    });
    load.present();
  }

  //Memorizza i dati nel database
  addUserDB() {
    //if (!this.userStorage.getUser(this.ValidationFormUser.value.email)) {
      this.newUser.email = this.ValidationFormUser.value.email;
      /*
      this.newUser.age = 0;
      this.newUser.gender = '';
      this.newUser.height = 0;
      this.newUser.weight = 0;
       */
      this.userStorage.addUser(this.newUser);
      this.newUser = <User>{};
    }
  //}
}
