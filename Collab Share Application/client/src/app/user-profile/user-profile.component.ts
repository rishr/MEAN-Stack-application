import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public selectedFile: any;
  public imgSrc: string;
  public users = [];
  public userData = [];
  public firstName: any;
  public lastName: any;
  public password: any;
  public emailAddress: any;
  public disableEmail: any;
  public contactNumber: any;
  public profession: any;
  public userId: any;
  public image: any;
  public id: any;
  public showGmailAccImage: any;
  public loggedEmail: any;
  public newpassword: any;
  public editPassDiv: any;
  public mySubscription: Observable<any>;

  constructor(private router: Router, private userService: UserService, private activeRoute: ActivatedRoute) { }

  public emailAvailable: any;
  ngOnInit() {

    this.activeRoute.queryParams
      .subscribe(params => {
        if (params.showLogout) {
          this.emailAvailable = true;
        }
      });

    this.userService.checkSession();

    this.loggedEmail = localStorage.getItem('loggedUser');
    this.loggedEmail = localStorage.getItem('loggedUser');
    this.loggedEmail = JSON.parse(this.loggedEmail).email;
    if (this.loggedEmail) {
      this.emailAvailable = true;
    }
    this.userService.getAllUsers()
      .subscribe(data => {
        this.users = [];
        this.users = data;
        console.log("data in user profile")
        console.log(data)
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].emailAddress == this.loggedEmail) {
            this.userData.push(data[i]);
            this.firstName = this.userData[0].firstName;
            this.lastName = this.userData[0].lastName;
            this.password = this.userData[0].password;
            this.emailAddress = this.loggedEmail;
            this.disableEmail = true;
            this.contactNumber = this.userData[0].contactNumber;
            this.profession = this.userData[0].profession;
            this.userId = this.userData[0]._id;
            this.id = this.userData[0]._id;
          }
        }
      });
  }

  refreshNav() {
    console.log('refresh nav ')
    this.emailAvailable = true;
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
    this.router.navigate(['']);
  }
}
