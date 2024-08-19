/**
 * Represents the root component of the application.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {}

  add(a: number, b: number) {
    return a + b;
  }
}
