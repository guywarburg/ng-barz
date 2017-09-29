import {Component} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {isNullOrUndefined} from "util";
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {MdDialog} from '@angular/material';
import {LoginComponent} from './login/login.component'

import {tempDb} from '../temp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  temp: any;
  openDetailsModal: boolean = false;
  selectedBar: any;
  openMarkVModal: boolean = false;
  openLoginModal: boolean = false;
  searchVisible: boolean = false;
  openUserAlreadyMakredModal: boolean = false;
  center: any = {
    lng: '',
    lat: ''
  };
  allBars: any = [
  {
    title: 'Shamrock',
    lng: 34.8627351,
    lat: 32.2800516
  },
  {
    title: 'Hanzl and Gretl',
    lng: 34.8630365,
    lat: 32.2787251
  },
  {
    title: 'Beer Shop',
    lng: 34.8589975,
    lat: 32.2807231
  },
  ];
  filteredBars: any;
  barsObservable: FirebaseListObservable<any[]>;
  userLoggedIn: boolean = false;

  constructor(db: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public dialog: MdDialog) {
    this.barsObservable = db.list('/bars');
    this.barsObservable.subscribe(state => {
      if(!isNullOrUndefined(state)) {
        this.allBars = [...state];
        this.filteredBars = [...this.allBars];
      }
    });
    this.afAuth.auth.onAuthStateChanged(user => {
      if(user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
     });
  }

  filterBars(value) {
    if(!value) {
      this.filteredBars = [...this.allBars];
    } else {
      this.filteredBars = this.allBars.filter(bar => {
        if(typeof bar.title === 'string') {
          return bar.title.toLowerCase().indexOf(value.toLowerCase()) > -1;
        } else {
          return true;
        }
        
      })
    }
  }

  reCenterMap(bar) {
    this.assignSelectedBar(bar);
    let newCenter: any = {
      lng: bar.lng,
      lat: bar.lat
    };
    this.center = Object.assign({}, newCenter);
  }

  assignSelectedBar(bar) {
    this.selectedBar = bar;
  }

  openModal(e) {
    this.openDetailsModal = true;
  }
  openMarkV(e) {
    this.openDetailsModal = false;
    console.log('e', e);
    if(this.userLoggedIn) {
      if(this.userAlreadyMarked(this.afAuth.auth.currentUser.uid, e)) {
        this.openUserAlreadyMakredModal = true;
      } else {
        this.openMarkVModal = true; 
      }
    } else {
      this.openLoginModal = true;
    }

  }
  closeMarkVModal() {
    this.openMarkVModal = false;
  }
  handleLoginSucess() {
    this.openLoginModal = false;
    if(!isNullOrUndefined(this.selectedBar)){
      this.openMarkVModal = true;
    }
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }
  userAlreadyMarked(uid: string, relevantRanks: any[]): boolean {
    return relevantRanks.filter(item => {
      return item.uid === uid;
    }).length > 0;
  }
  openDialog() {
    // this.dialog.open(LoginComponent);
  }
}
