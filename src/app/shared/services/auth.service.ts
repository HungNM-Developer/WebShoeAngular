import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import {auth} from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { FileI } from '../models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData$: Observable<firebase.User>;
  private filePath: string;

  constructor(public afAuth: AngularFireAuth, private storage: 
    AngularFireStorage, private route: Router) {  
    this.userData$ = afAuth.authState;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }  

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((_result) => {
        console.log('You have been successfully logged in!')
        this.route.navigate(['/']);

    }).catch((error) => {
        console.log(error)
    })
  }

  loginByEmail(user: UserI) {
    const { email, password } = user;
    return this.afAuth
      .signInWithEmailAndPassword(email, password);

  }

  logout() {
    this.afAuth.signOut();
  }

  preSaveUserProfile(user: UserI, image?: FileI): void{
    if(image){
      this.uploadImage(user,image);
    }else{
      //this.saveUserProfile(user);
    }

  }
  private uploadImage(user: UserI, image: FileI): void{
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(urlImage => {
          user.photoURL = urlImage;
          // this.saveUserProfile(user);
        });
      })
    ).subscribe();

  }

  async register(email:string,password:string){
    try{
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    }
    
    catch(error)
    {
      console.log(error);
    }	
  }


  // private saveUserProfile(user: UserI){
  //   this.afAuth.currentUser{
  //     displayName: user.displayName,
  //     photoURL: user.photoURL
  //   }).then(()=>console.log('User updated!'))
  //   .catch(err => console.log('Error',err));
  // }
}
