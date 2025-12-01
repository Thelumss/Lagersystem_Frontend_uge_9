import { Routes } from '@angular/router';
import { Admin } from './toolbar/admin/admin';
import { Customer } from './toolbar/customer/customer';
import { Product } from './toolbar/product/product';
import { ToolbarMenu } from './toolbar-menu/toolbar-menu';
import { Home } from './toolbar/home/home';

export const routes: Routes = [

    // the difrent routes that the system allows
    {path: 'admin', component: Admin},
    {path: 'customer', component: Customer},
    {path: 'product', component: Product},
    {path: 'home', component: Home},
    // here is a redirect if people try any thing that is not a know path
    {path: '**', redirectTo: 'home'},

];
