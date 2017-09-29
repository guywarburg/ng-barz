import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() bars: any;
  @Input() center: any;
  @Output() selectedBar: EventEmitter<any> = new EventEmitter();
  @Output() openDialog: EventEmitter<any> = new EventEmitter();
  ///////////////////
  // Map Settings //
  //////////////////
  // default center
  lat: number = 32.0767365;
  lng: number = 34.7800686;
  // My Location
  myLat: number = 32.0767365;
  myLng: number = 34.7800686;
  // default zoom
  zoom: number = 16;
  // Beer icon
  iconPath: string = '../assets/images/beer-icon-white.png';
  // map color settings
  options: any = [
    {
      stylers: [
        { "invert_lightness": "true" }, {"visibility": "simplified"}]
    },
    {
      featureType: "poi",
      stylers: [{
        "visibility": "off"
      }]
    },
    {
      featureType: "transit",
      stylers: [{
        "visibility": "off"
      }]
    }
  ];
  // info window settings
  backgroundColor: string = '#000';
  border: any = {
    width: '1px',
    color: '#eee'
  };
  fontColor: string = '#fff';

  constructor() {
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lng = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.myLng = position.coords.longitude;
        this.myLat = position.coords.latitude;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.center && changes.center.previousValue !== changes.center.currentValue) {
      this.lng = this.center.lng ? this.center.lng: this.lng;
      this.lat = this.center.lat ? this.center.lat : this.lat;
    }
  }

  handleMarkerClick(bar) {
    bar.snazzyStatus = true;
    this.selectedBar.emit(bar);
  }

  openModal(bar) {
    bar.snazzyStatus = false;
    this.openDialog.emit(bar);
  }
}
