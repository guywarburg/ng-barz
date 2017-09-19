import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'bar-list',
  templateUrl: './bar-list.component.html',
  styleUrls: ['./bar-list.component.scss']
})
export class BarListComponent {
  @Input() bars: any;
  @Output() selectedBar: EventEmitter<any> = new EventEmitter();

  setSelectedBar(bar) {
    this.selectedBar.emit(bar);
  }
}
