import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {

  // Creating an array to store the list of posts
  public posts: any [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.checkSession();
    this.getAllPost();
  }

  getAllPost() {
    // this.userService.getAllPost().subscribe(result => {
    //     this.posts = result['data'];
    // });
  }
}
