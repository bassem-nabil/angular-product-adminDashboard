export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home'
      },
      {
        id: 'products',
        title: 'Products',
        type: 'item',
        url: '/products',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'products edit',
        title: 'Edit',
        type: 'item',
        url: '/products/edit',
        classes: 'nav-item',
        icon: 'feather icon-sidebar',
        hidden: true
      },
      {
        id: 'products add',
        title: 'Add',
        type: 'item',
        url: '/products/add',
        classes: 'nav-item',
        icon: 'feather icon-sidebar',
        hidden: true
      },
      {
        id: 'orders',
        title: 'Orders',
        type: 'item',
        url: '/orders',
        classes: 'nav-item',
        icon: 'feather icon-server'
      }
    ]
  }
];
