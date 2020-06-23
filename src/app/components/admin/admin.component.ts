import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileI } from './../../../app/shared/models/file.interface';
import { UserI } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StatusloginService } from 'src/app/shared/services/statuslogin.service';


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
  //public currentImages = 'https://i.pinimg.com/originals/ac/a6/b7/aca6b72e8125d6dadcdc60318a140a5c.jpg';

  public currentImage ='../../../assets/images/aca6b72e8125d6dadcdc60318a140a5c.png'
  public profileForm = new FormGroup({
    displayName: new FormControl({ value: '', disabled: true }, Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl('', Validators.required),
  })

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public opened = false;
  constructor(private breakpointObserver: BreakpointObserver, public authSvc: AuthService, private userService: StatusloginService) {
  }



  displayName: string = "";
  ngOnInit(): void {
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);

    });

    this.userService.getCurrentUser()
      .then(user => this.displayName = user.displayName != null ? user.displayName : user.email);

    console.log(this.displayName);
  }

  onLogout(): void {
    this.authSvc.logout();
  }
  onSaveUser(user: UserI): void {
    this.authSvc.preSaveUserProfile(user, this.image);

  }

  private initValuesForm(user: UserI): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,

    });
  }


  handleImage(image: FileI): void {
    this.image = image;
  }

}


