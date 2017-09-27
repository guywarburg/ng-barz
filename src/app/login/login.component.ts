import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() loginSuccess: EventEmitter<any> = new EventEmitter();
  login: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
          public afAuth: AngularFireAuth) {
    this.createForm();
   }

  ngOnInit() {
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
        // close modal, open markv modal
      }
      ).catch((error) => {
        // Handle Errors here.
        console.log('error', error);
      });
    }
  }
}

// TODO - refactor into 2 separate components