import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from './../../../shared/models/user.interface';
import { AuthService } from './../../../shared/services/auth.service';
import { FileI } from './../../../shared/models/file.interface';
import { from } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public image: FileI;
  public currentImage = '../../../../assets/images/aca6b72e8125d6dadcdc60318a140a5c.png';

  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl({value:'',disabled:true},Validators.required),
    email: new FormControl({value:'',disabled:true},Validators.required),
    photoURL: new FormControl('',Validators.required),
  })

  ngOnInit(): void {
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);
      
    });
  }

  onSaveUser(user: UserI): void{
    this.authSvc.preSaveUserProfile(user, this.image);
    
  }

  private initValuesForm(user: UserI): void{
    if(user.photoURL){
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      
    });
  }

  handleImage(image: FileI): void{
    this.image = image;
  }

}
