import { Component, signal } from '@angular/core';
import { RouterOutlet, ɵEmptyOutletComponent } from '@angular/router';
import { Admin } from "./toolbar/admin/admin";
import { ToolbarMenu } from "./toolbar-menu/toolbar-menu";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [ToolbarMenu, RouterOutlet,HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Lagersystem');
}
