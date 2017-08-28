import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() bars: any;
  @Input() center: any;
  @Output() selectedBar: EventEmitter<any> = new EventEmitter();
  ///////////////////
  // Map Settings //
  //////////////////
  // default center
  lat: number = 51.678418;
  lng: number = 7.809007;
  // My Location
  myLat: number = 51.678418;
  myLng: number = 7.809007;
  // default zoom
  zoom: number = 16;
  // Beer icon
  iconPath: string = '../assets/images/beer-icon-white.png';
  test: string = 'Test';
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
      this.lng = this.center.lng;
      this.lat = this.center.lat;
    }

  }

  handleMarkerClick(bar) {
    this.selectedBar.emit(bar);
  }
}
