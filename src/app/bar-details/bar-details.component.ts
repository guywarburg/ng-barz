import {Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.scss']
})
export class BarDetailsComponent implements OnChanges {
  @Input() bar: any;
  @Output() openMarkV: EventEmitter<any> = new EventEmitter();
  barDetails: any;
  ranksObservable: FirebaseListObservable<any[]>;
  todayRanks: any[];
  relevantRanks: any;
  relevantNumberOfRanks: number;

  constructor(db: AngularFireDatabase) {
    let today = this.getToday();
    this.ranksObservable = db.list('/ranks', {
      query: {
        orderByChild: 'date',
        equalTo: today
      }
    });

    this.ranksObservable.subscribe(state => {
      this.todayRanks = state;
      if(this.bar){
        this.ngOnChanges();
      }
    })
  }

  ngOnChanges() {
    this.barDetails = this.bar;
    if(!isNullOrUndefined(this.todayRanks)){
      this.relevantRanks = this.getRanksPerBar(this.barDetails.title, this.todayRanks);
      this.relevantNumberOfRanks = this.getNumberOfRanks(this.barDetails.title, this.todayRanks);
    }
  }

  getToday() {
    let d = new Date(),
    hour = d.getHours();

  // if the time is before 6am fix date to yesterday
  if(hour < 6) d.setDate(d.getDate() - 1);

  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
}

  getRanksPerBar(barName: string, ranks: any[]): any {
    let filteredRanks = ranks.filter(item => {
      return item.barName === barName;
    });
    if (filteredRanks.length) {
      return this.aggregateDate(filteredRanks);
    } else {
      return {
        atmosphere: 50,
        crowd: 50,
        menToWomen: 50
      }
    }
  }

  aggregateDate(data: any[]): any {
    let atmosphere = 0, crowd = 0, menToWomen = 0;
    data.forEach(item => {
      atmosphere += item.atmosphere;
      crowd += item.crowd;
      menToWomen += item.menToWomen;
    });

    return {
      atmosphere: Math.floor(atmosphere / data.length),
      crowd: Math.floor(crowd / data.length),
      menToWomen: Math.floor(menToWomen / data.length)
    }
  }

  getNumberOfRanks(barName: string, ranks: any[]): number {
    return ranks.filter(item => {
      return item.barName === barName;
    }).length;
  }

  getAllRelevantRanks(barName: string, ranks: any[]): any[] {
    return ranks.filter(item => {
      return item.barName === barName;
    });
  }

  handleOpenMarkV() {
    this.openMarkV.emit(
      this.getAllRelevantRanks(this.barDetails.title, this.todayRanks)
    );
  }
}
