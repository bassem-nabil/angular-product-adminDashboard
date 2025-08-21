import { Component, output } from '@angular/core';
import { NavContentComponent } from './nav-content/nav-content.component';

@Component({
  selector: 'app-navigation',
  imports: [NavContentComponent],
  templateUrl: './navigation.component.html',
  styleUrls: []
})
export class NavigationComponent {
  windowWidth: number;
  NavMobCollapse = output();

  constructor() {
    this.windowWidth = window.innerWidth;
  }

  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.NavMobCollapse.emit();
    }
  }
}
