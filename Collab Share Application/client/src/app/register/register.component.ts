import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<any>();
  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }
  public emailAvailable: any;
  public errorPopup: any;
  public errorText: string;
  ngOnInit() { }

  hideErrors() {
    this.errorPopup = false;
  }

  registerUser(event) {
    console.log("c")
    const errors = [];
    const target = event.value;
    const emailAddress = target.emailAddress;
    const password = target.password;
    const cpassword = target.cpassword;


    // if (password !== cpassword) {
    //   errors.push('passwords do no match');
    //   this.errorText = "Password should match";
    //   return;
    // }
    var regexEmail = this.ValidateEmail(event.value.emailAddress);
    if(!regexEmail){
      this.errorPopup = true;
      //alert("Please enter Email Address and Password");
      this.errorText = "Please enter valid Email Address";
      return
    }
    if (event.value.emailAddress == "" && event.value.password == "") {
      this.errorPopup = true;
      //alert("Please enter Email Address and Password");
      this.errorText = "Please enter Email Address and Password";
      return;
    }
    if (event.value.emailAddress == "" && event.value.password != "") {
      this.errorPopup = true;
      this.errorText = "Please enter Email Address";
      return;
    }
    if (event.value.emailAddress != "" && event.value.password == "") {
      this.errorPopup = true;
      this.errorText = "Please enter Password";
      return;
    }
    if (event.value.password != event.value.cpassword) {
      this.errorPopup = true;
      this.errorText = "Password should match";
      return;
    }
    // more validation here

    if (errors.length === 0) {
      const formData = event.value;
      console.log(formData);
      this.auth.registerUser(formData)
        .subscribe(data => {
          console.log("registered data")
          console.log(data)
          this.emailAvailable = true;
          localStorage.setItem('loggedUser', JSON.stringify(data.userdata));
          this.router.navigate(['user-profile']);
          // Form submit action here
        });
    }
  }
  //  this function validates the email
  ValidateEmail(emailAddress) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
      return (true)
    }
    return (false)
  }

}
