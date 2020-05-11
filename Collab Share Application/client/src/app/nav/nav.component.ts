import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  public appTitle = 'COLLAB';
  constructor(private router: Router, private auth: AuthService) { }
  public emailAvailable: any;
  public loggedEmail: any;
  public showLogin: any;
  public showRegister: any;
  public userAvailable = this.auth.isLoggedIn();

  ngOnInit() {
    //
    this.loggedEmail = localStorage.getItem('loggedUser');

    if (this.loggedEmail != null) {
      this.emailAvailable = true;
      this.showLogin = false;
      this.showRegister = false;
    } else {
      this.emailAvailable = false;
      this.showLogin = true;
      this.showRegister = true;
    }
  }

  refreshNav($event) {
    console.log('refresh event');
    console.log($event);
  }
  goToUserProfile() {
    this.router.navigate(['user-profile']);
  }
  logout() {
    localStorage.clear();
    this.emailAvailable = false;
    this.showLogin = true;
    this.showRegister = true;
  }

}
