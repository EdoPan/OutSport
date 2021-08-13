import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validationMessages = {
    email: [
      {type: 'required',message:'Enter your Email Adress'},
      {type:'pattern', meesage:'Please the Email Entered is Incorrect. Try again..'}
    ],
    password: [
      {type: 'required', message: 'Password is required here'},
      {type:'minlength', message: 'Password must be at least 5 character'}
    ]
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  ValidationFormUser: FormGroup;
  loading: any;

  constructor( private router: Router,
               private formbuilder: FormBuilder,
               private authService: AuthService,
               private alertCtrl: AlertController,
               private navCtr: NavController){}

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
    this.router.navigate(['tabs']);
    try {
      this.authService.userRegistration(value).then( response =>{
          console.log(response);
          if(response.user){
            response.updateProfile({
              email: value.email,
            });
            this.loading.dismiss();
            this.router.navigate(['tabs']);
          }
        }, error=>{
          this.loading.dismiss();
          this.errorLoading(error.message);
        }
      );}catch (erro){
      console.log(erro);
    }
  }

  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:'Error Registering',
      message:message,
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
    var load = await this.alertCtrl.create({
      message:'Please wait',
    });
    load.present();
  }

}