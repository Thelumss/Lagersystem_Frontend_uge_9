import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar-menu',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule
],
  templateUrl: './toolbar-menu.html',
  styleUrl: './toolbar-menu.css',
})
export class ToolbarMenu {

  // changes the page when a buttton is clicked 
  onButtonClick(buttonName: string) {
    this.router.navigate([buttonName.toLocaleLowerCase()]);
  }
    constructor(public router: Router) {

  }
}
