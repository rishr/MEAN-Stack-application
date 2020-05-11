import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
@Component({
  selector: 'app-user-download',
  templateUrl: './user-download.component.html',
  styleUrls: ['./user-download.component.scss']
})
export class UserDownloadComponent implements OnInit {

  public selectedFile: any;
  public imgSrc: string;
  public users = [];
  public userData = [];
  public firstName: any;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.checkSession();
    const userId = JSON.parse(localStorage.getItem('loggedUser')).id;
    const sessId = localStorage.getItem('sessionData');
    const resData = {
      userId: userId,
      sessId: sessId
    };
    this.userService.getSessionData(resData)
      .subscribe(data => {
        console.log("data in download")
        console.log(data.docData);
        this.firstName = data.docData;
      })

    this.userService.getAllUsers()
      .subscribe(data => {
        this.users = [];
        this.users = data;
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].firstName == "Aegon Targaryen") {

            this.userData.push(data[i]);
            //this.firstName = this.userData[i].firstName;
          }
        }
      });
  }

  saveTextAsFile(data, filename) {

    if (!data) {
      console.error('Console.save: No data')
      return;
    }

    //Boolean window;
    if (!filename) filename = 'console.json'

    var blob = new Blob([data], { type: 'text/plain' }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a')

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    else {
      var e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click', true, false);
      // e.init
      a.dispatchEvent(e);
    }
  }


  expFile() {
    const fileText = this.firstName;
    const fileName = this.firstName + 'newfile001.txt';
    this.saveTextAsFile(fileText, fileName);
  }


}
