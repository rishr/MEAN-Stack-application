import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
// import { Post } from '../models/post.model';
// import { Post } from '../post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.checkSession();
  }

  addPost(event) {

    const target = event.value;
    // tslint:disable-next-line:no-string-literal
    const postTitle = target['postTitle'];
    // tslint:disable-next-line:no-string-literal
    const postDescription = target['postDescription'];

    const formData = event.value;
    const userId = JSON.parse(localStorage.getItem('loggedUser')).id;
    formData.userId = userId;
    this.userService.addPost(formData)
      .subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/user-profile');
      });
    // this.auth.loginUser(formData)
    //   .subscribe(data => {
    //     console.log(data.userdata);
    //     localStorage.setItem('loggedUser', JSON.stringify(data.userdata));
    //     // Form submit action here
    //   });
  }

}
