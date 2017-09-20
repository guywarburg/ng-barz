import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  markVForm: FormGroup;
  ranksObservable: FirebaseListObservable<any[]>;
  @Input() barTitle: string;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
              db: AngularFireDatabase) {
    this.createForm();
    this.ranksObservable = db.list('/ranks');
  }

  ngOnInit() {
  }

  createForm() {
    this.markVForm = this.fb.group({
      menToWomen: 50,
      crowd: 50,
      atmosphere: 50
    });
  }

  handleSubmit(){
    let newRank = {
      barName: this.barTitle, // TODO - pass barName
      date: this.getToday(),
      ...this.markVForm.value
    };
    console.log('newRank', newRank);
    this.ranksObservable.push(newRank);
    this.closeModal.emit();
    this.markVForm.reset();
  }

  getToday() {
    let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }
}
