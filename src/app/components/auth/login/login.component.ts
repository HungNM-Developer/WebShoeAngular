import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../../shared/services/auth.service';
import{UserI} from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public authSvc: AuthService, private route: Router) { }  // sửa privite thành public 8:25 || 17/05

  
  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  ngOnInit(): void {}

  onLogin(form: UserI){
    this.authSvc
    .loginByEmail(form)
    .then(res =>{
      console.log('Successfully', res);
      this.route.navigate(['/']);
    })
    .catch(err => console.log('Error', err));
  }
  
  
}
