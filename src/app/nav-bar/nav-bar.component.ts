import { Component, OnInit } from '@angular/core';

/**
 * Represents the NavBarComponent class.
 * This component is responsible for rendering the navigation bar.
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  menuItems = [{
      name: 'Home'
    }, {
      name: 'Gallery'
    }, {
      name: 'About Us'
    }, {
      name: 'Contact Us'
    }];
  constructor() { }

  ngOnInit(): void { }
}
