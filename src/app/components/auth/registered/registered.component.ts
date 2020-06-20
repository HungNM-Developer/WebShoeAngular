import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl, Validators} from'@angular/forms';
import{AuthService} from '../../../shared/services/auth.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit {
  RegisterForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  constructor(public authSvc:AuthService) { }

  ngOnInit(): void {
  }
  onRegister(){
    const{email,password} = this.RegisterForm.value;
    this.authSvc.register(email,password);
  }

}
