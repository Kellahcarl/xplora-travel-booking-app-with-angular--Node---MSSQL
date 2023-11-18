import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Collapse, Dropdown, initTE } from 'tw-elements';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor (private router: Router) { }

  ngOnInit() {
    initTE({ Collapse, Dropdown });
  }

  logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/login']);
    // console.log(localStorage.getItem('token'));
  };
  isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  fullname = localStorage.getItem('fullName')
}
