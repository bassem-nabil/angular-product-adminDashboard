import { Component, inject, input } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { NavigationItem, NavigationItems } from '../../../models/navigation';
import { TitleType } from '../../../models/breadcrumb';


@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: []
})
export class BreadcrumbComponent {
  private route = inject(Router);

  type = input<string>();

  navigations: NavigationItem[];
  breadcrumbList: Array<string> = [];
  navigationList!: TitleType[];
  showProcutsLink = false;

  constructor() {
    this.navigations = NavigationItems;
    this.setBreadcrumb();
  }

  setBreadcrumb() {
    this.route.events.subscribe((router: Event) => {
      if (router instanceof NavigationEnd) {
        const activeLink = router.url;
        const breadcrumbList = this.filterNavigation(this.navigations, activeLink);
        this.navigationList = breadcrumbList;
      }
    });
  }

  filterNavigation(navItems: NavigationItem[], activeLink: string): TitleType[] {
    for (const navItem of navItems) {
      this.showProcutsLink = false;
      if (activeLink.startsWith('/products/edit')) {
        activeLink = '/products/edit';
        this.showProcutsLink = true;
      }
      if (activeLink.startsWith('/products/add')) {
        this.showProcutsLink = true;
      }
      if (navItem.type === 'item' && 'url' in navItem && navItem.url === activeLink) {
        return [
          {
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          }
        ];
      }
      if ((navItem.type === 'group' || navItem.type === 'collapse') && 'children' in navItem) {
        const breadcrumbList = this.filterNavigation(navItem.children!, activeLink);
        if (breadcrumbList.length > 0) {
          breadcrumbList.unshift({
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          });
          return breadcrumbList;
        }
      }
    }
    return [];
  }
}
