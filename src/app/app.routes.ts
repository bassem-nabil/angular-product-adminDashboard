import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
        path: '',
        loadComponent: () => import('./components/_shared/_layout/layout.component').then((c) => c.LayoutComponent),
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./components/dashboard/dashboard.component').then((c) => c.DashboardComponent)
            },
            {
                path: 'products',
                loadComponent: () => import('./components/products/products.component').then((c) => c.ProductsComponent)
            },
            {
                path: 'products/add',
                loadComponent: () => import('./components/productsAddEdit/productsAddEdit.component').then((c) => c.ProductsAddEditComponent)
            },
            {
                path: 'products/edit/:id',
                loadComponent: () => import('./components/productsAddEdit/productsAddEdit.component').then((c) => c.ProductsAddEditComponent)
            },
            {
                path: 'orders',
                loadComponent: () => import('./components/orders/orders.component').then((c) => c.OrdersComponent)
            },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
