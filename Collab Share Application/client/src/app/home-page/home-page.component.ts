import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public showLogin: any;
  public showRegister: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.showLogin = true;
    this.showRegister = true;
  }

}
