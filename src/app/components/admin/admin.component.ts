import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileI } from './../../../app/shared/models/file.interface';
import { UserI } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  options: FormGroup;
  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(16, Validators.min(10));

 

  getFontSize() {
    return Math.max(10, this.fontSizeControl.value);
  }

  public image: FileI;
  public currentImage = 'https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/64486706_2343423725906141_534789064042217472_n.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=5BGHM7GEK-sAX_Zvfz5&_nc_ht=scontent-xsp1-1.xx&oh=c9c12ae2099149f5bd73c1b4e9d9fb52&oe=5EE7837A';
  
  public profileForm = new FormGroup({
    displayName: new FormControl('',Validators.required),
    email: new FormControl({value:'',disabled:true},Validators.required),
    photoURL: new FormControl('',Validators.required),
  })

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public opened = false;
  constructor(private breakpointObserver: BreakpointObserver, private authSvc: AuthService) {
   }
  

  ngOnInit(): void {
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);
      
    });
  }

  onLogout(): void{
    this.authSvc.logout();
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


