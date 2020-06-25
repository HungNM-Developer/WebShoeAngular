import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import {auth} from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { FileI } from '../models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
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
        alert('You have been successfully logged in!')
        this.route.navigate(['/']);

    }).catch((error) => {
      alert('Login failed')
        // console.log(error)
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

  register(email:string,password:string){
    // try{
    //   const result = this.afAuth.createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );
    //   alert('SignUp Successfull ')
    //   return result
    // }
    
    // catch(error)
    // {
    //   console.log(error);
    // }	
   
    return new Promise<any>((resolve, reject)=>{
      this.afAuth.createUserWithEmailAndPassword(email,password)
      .then(res =>{
        console.log('Successfully', res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sign Up Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.logout();
      })     
      .catch(_err =>Swal.fire({
        icon: 'error',
        title: 'Sign Up Failed',
        //footer: '<a href="/registered">No account you must register</a>'
      }) 
      );
    });
  }


  // private saveUserProfile(user: UserI){
  //   this.afAuth.currentUser{
  //     displayName: user.displayName,
  //     photoURL: user.photoURL
  //   }).then(()=>console.log('User updated!'))
  //   .catch(err => console.log('Error',err));
  // }
}
