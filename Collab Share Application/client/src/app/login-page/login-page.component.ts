import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  @Output() refreshEvent = new EventEmitter<any>(); // Emit the close popup event to refresh contacgt list

  public emailAvailable: any;
  public showLogin: any;
  public showRegister: any;
  public errorPopup: any;
  public errorText: string;
  ngOnInit() {
    this.userService.checkSession();
  }
  hideErrors() {
    this.errorPopup = false;
  }
// login user fucntion along with validations
  loginUser(event) {

    const formData = event.value;
    if (event.value.emailAddress === '' && event.value.password === '') {
      this.errorPopup = true;
      this.errorText = 'Please enter Email Address and Password';
      return;
    }
    // email  and password
    if (event.value.emailAddress === '' && event.value.password !== '') {
      this.errorPopup = true;
      this.errorText = 'Please enter Email Address';
      return;
    }
    if (event.value.emailAddress !== '' && event.value.password === '') {
      this.errorPopup = true;
      this.errorText = 'Please enter Password';
      return;
    }
    const regexEmail = this.ValidateEmail(event.value.emailAddress);
    if (!regexEmail) {
      this.errorPopup = true;
      this.errorText = 'Please enter valid Email Address';
    } else {
      this.auth.loginUser(formData)
        .subscribe(data => {
          localStorage.setItem('loggedUser', JSON.stringify(data.userdata));
          // Form submit action here
          if (data.userdata.resMsg === 'Login failed') {
            this.errorPopup = true;
            this.errorText = 'Email Address and Password do not match';
          } else {
            this.refreshEvent.emit();
            this.emailAvailable = true;
            this.showLogin = false;
            this.showRegister = false;
            this.router.navigateByUrl('/404', { skipLocationChange: true }).then(() =>
              this.router.navigate(['user-profile']));
          }
        });
    }

  }
  //  this function validates the email
  ValidateEmail(emailAddress) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
      return (true);
    }
    return (false);
  }


}
