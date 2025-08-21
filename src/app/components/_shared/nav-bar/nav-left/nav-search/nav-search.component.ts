import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-search',
  imports: [],
  templateUrl: './nav-search.component.html',
  styleUrls: []
})
export class NavSearchComponent {
  searchOn: boolean;

  constructor() {
    this.searchOn = false;
  }
}
