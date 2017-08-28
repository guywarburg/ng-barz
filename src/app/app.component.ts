import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
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

  constructor() {
    this.filteredBars = [...this.allBars];
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
    let newCenter: any = {
      lng: bar.lng,
      lat: bar.lat
    };
    this.center = Object.assign({}, newCenter);
  }
}
