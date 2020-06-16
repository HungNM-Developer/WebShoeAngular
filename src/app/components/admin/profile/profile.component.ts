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
  public currentImage = 'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/64486706_2343423725906141_534789064042217472_n.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=5BGHM7GEK-sAX_Zvfz5&_nc_ht=scontent-xsp1-1.xx&oh=c9c12ae2099149f5bd73c1b4e9d9fb52&oe=5EE7837A';

  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('',Validators.required),
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
