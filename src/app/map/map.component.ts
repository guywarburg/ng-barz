import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges
} from "@angular/core";
import { mapColors } from "../../shared/config";

@Component({
	selector: "app-map",
	templateUrl: "./map.component.html",
	styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit, OnChanges {
	@Input() bars: any;
	@Input() center: any;
	@Output() selectedBar: EventEmitter<any> = new EventEmitter();
	@Output() openDialog: EventEmitter<any> = new EventEmitter();

	public lat: number;
	public lng: number;

	public myLat: number;
	public myLng: number;

	public zoom: number;

	public iconPath: string;

	public mapOptions: any[];

	constructor() {
		this.setDefaultValues();
		this.iconPath = "../assets/images/Location_on.png";
		this.mapOptions = mapColors;
	}

	ngOnInit() {
		this.setMyLocation();
		this.centerMapToLocation();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (
			changes.center &&
			changes.center.previousValue !== changes.center.currentValue
		) {
			this.lng = this.center.lng ? this.center.lng : this.lng;
			this.lat = this.center.lat ? this.center.lat : this.lat;
		}
	}

	setDefaultValues() {
		this.myLat = 32.0767365;
		this.myLng = 34.7800686;
		this.zoom = 16;
	}

	setMyLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.myLng = position.coords.longitude;
				this.myLat = position.coords.latitude;
			});
		}
	}

	centerMapToLocation() {
		this.lat = this.myLat;
		this.lng = this.myLng;
	}
	handleMarkerClick(bar) {
		this.selectedBar.emit(bar);
		this.openDialog.emit(bar);
	}
}
