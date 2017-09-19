import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  template: `
  <div> {{ (user | async)?.displayName }} </div>
  <input [(ngModel)]="email">
  <input [(ngModel)]="password" type="password">
  <button (click)="login()">Login</button>
  <button (click)="logout()">Logout</button>
  `,
})
export class LoginComponent {
  email: string;
  password: string;
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
      // Handle Errors here.
      console.log('error', error);
      // ...
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
