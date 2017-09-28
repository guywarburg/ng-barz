import {Component, OnInit, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnChanges {
  @Input() userLoggedIn: boolean;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() loginSuccess: EventEmitter<any> = new EventEmitter();
  login: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  userName: string;

  constructor(private fb: FormBuilder,
          public afAuth: AngularFireAuth) {
    this.createForm();
   }

  ngOnChanges() {
    if(this.afAuth.auth.currentUser !== null) {
      this.userName = this.afAuth.auth.currentUser.displayName;
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  handleClose() {
    this.close.emit();
  }

  handleRegistration() {
    if(this.login) {
      const email = this.loginForm.controls.email.value;
      const pass = this.loginForm.controls.password.value;
      console.log(`logging in as ${email} with ${pass}`);
      this.afAuth.auth.signInWithEmailAndPassword(email, pass).then((res) => {
      // handle success
      console.log('success', res);
      this.loginSuccess.emit();
      // close modal, open markv modal
      }).catch((error) => {
        // Handle Errors here.
        console.log('error', error);
      });
    } else {
      const email = this.registerForm.controls.email.value;
      const pass = this.registerForm.controls.password.value;
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then((res) => {
        // handle success
        console.log('success', res);
        this.loginSuccess.emit();
        this.addUserName();
      }
      ).catch((error) => {
        // Handle Errors here.
        console.log('error', error);
      });
    }
  }

  addUserName() {
    let user = this.afAuth.auth.currentUser,
      userName:string = this.registerForm.controls.name.value.toString();

    user.updateProfile({displayName: userName, photoURL: ''}).then((res) => {
      // Update successful.
      console.log('username updated', res);
    }).catch((error) => {
      // An error happened.
      console.log('error', error);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

// TODO - refactor into 2 separate components
