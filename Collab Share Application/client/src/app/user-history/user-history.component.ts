import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {

  constructor(private userService: UserService) { }

  public loggedEmail: any;
  ngOnInit() {

    this.userService.checkSession();

    this.loggedEmail = localStorage.getItem('loggedUser');
    this.loggedEmail = JSON.parse(this.loggedEmail).email;
    console.log("this.loggedEmail" + this.loggedEmail)
  }

}
