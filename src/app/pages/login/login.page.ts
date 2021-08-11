import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationFormUser: FormGroup;
  validationUserMessage ={
    email:[
      {type:'required', message:'Please enter your Email'},
      {type:'pattern', message:'The Email entered is Incorrect.Try again'}
    ],
    password:[
      {type:'required', message:'Please Enter your Password!'},
      {type:'minlength', message:'The Password must be at least 5 characters or more'}

    ]
  };

  constructor( public formbuilder: FormBuilder, public authservice: AuthService, private router: Router, ) { }

  ngOnInit() {
    this.validationFormUser = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  LoginUser(value){
    console.log('Am logged in');
    try {
      this.authservice.loginFireauth(value).then( resp =>{
          console.log(resp);
          this.router.navigate(['activities']);
        })
    }catch(err){
      console.log(err);
    }
  }

}
