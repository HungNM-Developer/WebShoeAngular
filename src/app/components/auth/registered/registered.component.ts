import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl, Validators} from'@angular/forms';
import{AuthService} from '../../../shared/services/auth.service';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit {
  RegisterForm = new FormGroup({
    displayName: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  private image:any;
  constructor(public authSvc:AuthService) { }

  ngOnInit(): void {
  }
  async onRegister(){
    const{email,password} = this.RegisterForm.value;
    this.authSvc.register(email,password);
  }
  handleImage(event:any): void{
    this.image = event.target.files[0]
  }

}
