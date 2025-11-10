import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from "../toolbar/admin/admin";
import { Customer } from "../toolbar/customer/customer";
import { Product } from "../toolbar/product/product";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { Home } from "../toolbar/home/home";

@Component({
  selector: 'app-toolbar-menu',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    NgIf
],
  templateUrl: './toolbar-menu.html',
  styleUrl: './toolbar-menu.css',
})
export class ToolbarMenu {

  lastPressed: string = '';

  Home() {
    this.router.navigate([`home`]);
  }
  Customer() {
    this.router.navigate([`customer`]);
  }
  Product() {
    this.router.navigate([`product`]);
  }

  onButtonClick(buttonName: string) {
    this.lastPressed = buttonName;
    this.router.navigate([buttonName.toLocaleLowerCase()]);
  }
  isActive(buttonName: string): boolean {
    return this.lastPressed === buttonName;
  }
    constructor(public router: Router) {

  }
}
