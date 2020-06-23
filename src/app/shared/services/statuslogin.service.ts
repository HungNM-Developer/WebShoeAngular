import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class StatusloginService {

  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) { }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var sta = this.afAuth.onAuthStateChanged(function (sta) {
        if (sta) {
          resolve(sta);
        } else {
          reject('No user logged in');
        }
      })
    });
  }
}
