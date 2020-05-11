import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  private urlParam: string;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.urlParam = this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.chatService.joinSession(this.urlParam)
        .subscribe(data => {
          console.log(data);
          if (!data.status) {
            this.router.navigateByUrl('/404');
          } else {
            console.log(data);
            localStorage.setItem('inviteAuth', data.authToken);
            localStorage.setItem('inviteEmail', data.emailAddress);
            this.router.navigateByUrl('/collab/' + data.sessionId);
          }
        });
    }, 2000);
  }

}
