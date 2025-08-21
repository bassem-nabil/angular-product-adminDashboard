import { Component, OnInit, output } from '@angular/core';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavigationItem, NavigationItems } from '../../../../models/navigation';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-nav-content',
  imports: [NgScrollbarModule, NavGroupComponent],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {

  navigation: NavigationItem[];
  windowWidth: number;

  NavMobCollapse = output();

  constructor() {
    this.navigation = NavigationItems;
    this.windowWidth = window.innerWidth;
  }

  ngOnInit() {
    if (this.windowWidth < 992) {
      setTimeout(() => {
        document.querySelector('.pcoded-navbar')?.classList.add('menupos-static');
        (document.querySelector('#nav-ps-gradient-able') as HTMLElement).style.height = '100%';
      }, 500);
    }
  }
}
