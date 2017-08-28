import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() textChanged: EventEmitter<any> = new EventEmitter();
  filterText: string = '';

  handleTextChange(e) {
    console.log('e', e);
    this.filterText = e.target.value;
    this.textChanged.emit(this.filterText);
  }
}
