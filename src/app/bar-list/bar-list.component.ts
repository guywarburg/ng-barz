import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'bar-list',
  templateUrl: './bar-list.component.html',
  styleUrls: ['./bar-list.component.scss']
})
export class BarListComponent implements OnInit {
  @Input() bars: any;
  @Output() selectedBar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setSelectedBar(bar) {
    this.selectedBar.emit(bar);
  }
}
