import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collab',
  templateUrl: './collab.component.html',
  styleUrls: ['./collab.component.scss']
})

export class CollabComponent implements OnInit {
  public systemHandle: string;
  public urlParam: string;
  public messages: string[] = [];
  public collabMessage: string;
  public activeCount = 0;
  public collabText: string;
  public showRestrictButton = true;
  public showSaveButton = true;
  public showInviteBox = true;
  public isSessionRestricted: boolean;
  public loggedUserId: string;
  public posts: {};


  constructor(private activeRoute: ActivatedRoute, private chatService: ChatService, private route: Router) { }
  ngOnInit() {
    this.urlParam = this.activeRoute.snapshot.paramMap.get('code');
    if (localStorage.getItem('systemHandle') === null) {
      const systemHandle = prompt('Whats your name?');
      localStorage.setItem('systemHandle', systemHandle);
    }

    // Check for restricted session
    this.chatService.checkSession(this.urlParam)
      .subscribe(data => {
        if (data.restrict) {
          this.isSessionRestricted = true; // session is restricted
          this.showRestrictButton = false;
          if (localStorage.getItem('loggedUser') == null || localStorage.getItem('loggedUser') === 'null') {
            // Random user so don't show save button
            this.showSaveButton = false;
          }
        }
        userCheckAccess();
      });

    const userCheckAccess = () => {
      if (localStorage.getItem('loggedUser') == null) {
        // Implies user is not logged in. Random user
        this.showSaveButton = false;
        this.showInviteBox = false;
        this.showRestrictButton = false; // hide the restrict button
        if (this.isSessionRestricted) {
          // Session is restricted. If there is no auth token, restrict the user
          if (localStorage.getItem('inviteAuth') != null) {
            // Implies there is an auth code for the system
            const authCode = localStorage.getItem('inviteAuth');
            this.chatService.checkLinkAccess(this.urlParam, authCode)
              .subscribe(check => {
              });
          } else {
            // No auth token. Send to 404
            this.route.navigate(['/404']);
          }
        }
      } else {
        this.showRestrictButton = true;
      }
    };

    this.chatService.listenToAddUser()
      .subscribe((data) => {
        this.activeCount = data.updatedCount;
      });

    this.chatService.listenToChatMessage()
      .subscribe((message: any) => {
        this.messages.push(message);
      });

    this.chatService.listenToCollab()
      .subscribe((collabMsg: any) => {
        this.collabMessage = collabMsg;
      });

    this.chatService.getAllPosts(this.urlParam)
      .subscribe(data => {
        this.posts = data.posts;
      });
  }

  saveData(data) {
    if (localStorage.getItem('loggedUser') !== null || localStorage.getItem('loggedUser') !== 'null') {
      const plainData = data.replace(/<[^>]*>/g, '');
      const reqData = {
        id: JSON.parse(localStorage.getItem('loggedUser')).id,
        sessId: localStorage.getItem('sessionData'),
        sessData: plainData
      };
      this.chatService.saveData(reqData)
        .subscribe(doc => {
        });
    }
  }

  sendChatMessage(messageText) {
    this.systemHandle = localStorage.getItem('systemHandle');
    this.chatService.emitChatMessage(messageText, this.systemHandle);
  }

  sendEmail(emails) {
    const dataArr = {};
    const emailArr: any = [];

    // tslint:disable-next-line:no-string-literal
    dataArr['sessionData'] = {
      sessionId: localStorage.getItem('sessionData')
    };
    emails.split(',').forEach((element) => {
      const feed = { email: element, token: this.generateToken() };
      // tslint:disable-next-line:no-string-literal
      emailArr.push(feed);
    });
    this.chatService.sendEmailInvite(dataArr, emailArr)
      .subscribe(data => {
      });
    alert('Email invites forwarded');
  }

  generateToken(): string {
    const validChars = 'QWERTYUIOPASDFGHJKLZXCVBNMzxcvbnmqwertyuiopasdfghjkl0123456789-_~.';
    let array = new Uint8Array(40);
    window.crypto.getRandomValues(array);
    array = array.map(x => validChars.charCodeAt(x % validChars.length));
    const randomToken = String.fromCharCode.apply(null, array);
    return randomToken;

  }

  collab(e) {
    const inp = document.getElementById('editBox');
    this.chatService.emitCollab(inp.innerText);
  }

  restrictSession() {
    const sessId = localStorage.getItem('sessionData');
    this.showRestrictButton = false;
    this.chatService.restrictSession(sessId)
      .subscribe(data => {
      });
  }
}
