import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.scss']
})
export class UserEditProfileComponent implements OnInit {
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
  public emailAvailable: any;
  public mainPassword: any;
  public errorPopup: any;
  public errorText: string;
  @Output() closeEvent = new EventEmitter<any>();
  // Inject the UserService into the component
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.checkSession();
    this.loggedEmail = localStorage.getItem('loggedUser');
    this.loggedEmail = JSON.parse(this.loggedEmail).email;
    this.userService.getAllUsers()
      .subscribe(data => {
        this.users = [];
        this.users = data;
        console.log(this.users);
        console.log(this.loggedEmail);
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].emailAddress === this.loggedEmail) {

            this.userData.push(data[i]);
            this.firstName = this.userData[0].firstName;
            this.lastName = this.userData[0].lastName;
            this.password = this.userData[0].password;
            this.emailAddress = this.loggedEmail;
            this.mainPassword = this.userData[0].mainPassword
            this.disableEmail = true;
            this.contactNumber = this.userData[0].contactNumber;
            this.profession = this.userData[0].profession;
            this.userId = this.userData[0]._id;
            this.id = this.userData[0]._id;
          }
        }
      });
  }
  hideErrors() {
    this.errorPopup = false;
  }
  onSubmit(e) {
    const formData = e.value;
    formData.userId = this.userId;

    if (e.value.contactNumber !== "") {
      var regexNum = this.validatenumber(e.value.contactNumber);
      if (!regexNum) {
        this.errorPopup = true;
        this.errorText = 'Please enter valid contact number';
        return;
      }
    }
    this.userService.updateUser(formData)
      .subscribe(data => {
        this.closeUpdateForm();
        this.emailAvailable = false;
        this.errorPopup = true;
        this.errorText = 'Your profile has been updated. Thank you!';
      });


  }
  closeUpdateForm() {
    this.closeEvent.emit();
  }

  public opClickEdit = true;
  editPassword(opClickEdit) {
    if (this.opClickEdit) {
      this.editPassDiv = true;
      this.opClickEdit = false;
      this.newpassword = this.newpassword;
    } else {
      alert(this.password);
      this.editPassDiv = false;
      this.opClickEdit = true;
      this.newpassword = this.password;
    }
  }
  validatenumber(num) {
    if (/^\d{10}$/i.test(num)) {
      return (true)
    }
    return (false)
  }

}

