import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile-nav',
  templateUrl: './user-profile-nav.component.html',
  styleUrls: ['./user-profile-nav.component.scss']
})
export class UserProfileNavComponent implements OnInit {

  @Output() createDoc = new EventEmitter<any>();

  constructor(private router: Router) { }
  public showGmailAccImage: any;
  public loggedEmail: any;
  public showCreate = false;
  public emailAvailable = true;

  ngOnInit() {
    this.emailAvailable = true;
    this.loggedEmail = localStorage.getItem('loggedUser');
    this.loggedEmail = JSON.parse(this.loggedEmail).email;
    if (this.ValidateEmail(this.loggedEmail)) {
      this.showGmailAccImage = true;
    } else {
      this.showGmailAccImage = false;
    }
  }

  refreshNav(event) {
    console.log('refresh event ');
    console.log(event);
  }

  createSession() {
    this.createDoc.emit();
  }

  openEditProfile() {
    this.router.navigate(['user-edit-profile']);
  }

  openDownloadDocuments() {
    this.router.navigate(['user-download']);
  }

  openHistory() {
    this.router.navigate(['user-history']);
  }

  goBackToMainPage() {
    this.router.navigate(['/homepage']);
  }

  addPost() {
    this.router.navigate(['add-post']);
  }

  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.loggedEmail)) {
      return (true);
    }
    return (false);
  }
}
