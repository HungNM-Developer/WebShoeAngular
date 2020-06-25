import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

//import { BackendService } from 'src/app/services/backend.service';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pagelogin',
  templateUrl: './pagelogin.component.html',
  styleUrls: ['./pagelogin.component.css']
})
export class PageloginComponent implements OnInit {

  registered = false;
	submitted = false;
  userForm: FormGroup;
  email: string = '';
  password: string = '';
  constructor(private formBuilder: FormBuilder, private _http: HttpClient,  private _router: Router) { }

  ngOnInit(): void {
  }
  async onSubmit()
  {
    let email: string;
    let password: string;

    let respone = await this._http.post("http://localhost:8000/createuser", 
    {
      "email": this.email,
      "password": this.password,

    }).toPromise()

    console.log(respone);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sign Up Successfully',
      showConfirmButton: false,
      timer: 1500
    })
  };

}
