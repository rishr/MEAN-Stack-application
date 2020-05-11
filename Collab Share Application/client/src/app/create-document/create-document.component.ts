import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<any>();
  constructor(private router: Router, private chatService: ChatService, private userService: UserService) { }

  ngOnInit() {
    this.userService.checkSession();
  }

  generateCode() {
    this.closeEvent.emit();
    const code = this.getCode();
    const navUrl = '/collab/' + code;
    const user = JSON.parse(localStorage.getItem('loggedUser')).id;
    const userData = {
      userId: user,
      sessionId: code
    };
    localStorage.setItem('sessionData', code);
    this.chatService.saveSessionData(userData)
      .subscribe(data => {});
    this.router.navigateByUrl(navUrl);
  }

  getCode(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < 5; index++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

}
