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

  ValidationFormUser: FormGroup;

  constructor( public formbuilder: FormBuilder, public authservice: AuthService, private router: Router, ) { }

  ngOnInit() {
    this.ValidationFormUser = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-z0-9\\.\\+_-]+@[A-z0-9\\._-]+\\.[A-z]{2,6}')
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
          this.router.navigate(['tabs/activities']);
        })
    }catch(err){
      console.log(err);
    }
  }

}
