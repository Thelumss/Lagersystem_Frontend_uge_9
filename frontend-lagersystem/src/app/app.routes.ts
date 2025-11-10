import { Routes } from '@angular/router';
import { Admin } from './toolbar/admin/admin';
import { Customer } from './toolbar/customer/customer';
import { Product } from './toolbar/product/product';
import { ToolbarMenu } from './toolbar-menu/toolbar-menu';
import { Home } from './toolbar/home/home';

export const routes: Routes = [

    {path: 'admin', component: Admin},
    {path: 'customer', component: Customer},
    {path: 'product', component: Product},
    {path: 'home', component: Home},
    {path: '**', redirectTo: 'customer'},

];
