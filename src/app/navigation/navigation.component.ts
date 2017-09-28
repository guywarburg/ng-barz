import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OutputContext} from "@angular/compiler/src/util";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() userName: string;
  @Output() openSearch: EventEmitter<any> = new EventEmitter();
  @Output() openLogin: EventEmitter<any> = new EventEmitter();

  constructor() { }
  toggleSearch() {
    this.openSearch.emit();
  }
  handleLoginClick() {
    this.openLogin.emit();
  }
}
