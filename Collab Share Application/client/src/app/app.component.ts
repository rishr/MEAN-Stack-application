import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Collaborator';
  public url: string;
  public showNavBar = true;

  constructor() {
    this.url = window.location.href;
    if (this.url.indexOf('404') !== -1 || this.url.indexOf('join') !== -1) {
      this.showNavBar = false;
    } else if (this.url.indexOf('/collab/') !== -1) {
      this.showNavBar = true;
    } else {
      this.showNavBar = true;
    }
  }

  ngOnInit() { }

}
