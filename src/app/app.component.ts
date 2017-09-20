import {Component} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  openDetailsModal: boolean = false;
  selectedBar: any;
  openMarkVModal: boolean = false;
  val: number;
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

  constructor(db: AngularFireDatabase) {
    this.barsObservable = db.list('/bars');
    // if(this.barsObservable) {
    //   this.filteredBars = [...this.allBars];
    // }
    this.barsObservable.subscribe(state => {
      if(!isNullOrUndefined(state)) {
        this.allBars = [...state];
        this.filteredBars = [...this.allBars];
      }
    });
  }

  filterBars(value) {
    if(!value) {
      this.filteredBars = [...this.allBars];
    } else {
      this.filteredBars = this.allBars.filter(bar => {
        return bar.title.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    }
  }

  reCenterMap(bar) {
    console.log('bar', bar);
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
  openMarkV() {
    this.openDetailsModal = false;
    this.openMarkVModal = true;
  }
  closeMarkVModal() {
    // if user logged in
    this.openMarkVModal = false;
    // else open login modal
  }
}
