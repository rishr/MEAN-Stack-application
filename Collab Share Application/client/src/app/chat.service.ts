import { Chat } from './interfaces/chat';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:9090';
  private getCount = 'http://localhost:9090/collab/count';
  private sendInvites = 'http://localhost:9090/collab/email';
  private saveSession = 'http://localhost:9090/collab/savesession';
  private redirectUser = 'http://localhost:9090/collab/join/';
  private restrictUser = 'http://localhost:9090/collab/restrict/';
  private checkUser = 'http://localhost:9090/collab/checkSession/';
  private dataSave = 'http://localhost:9090/collab/savedata';
  private posts = 'http://localhost:9090/collab/getposts/';
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  emitChatMessage(messageText: string, username: string) {
    this.socket.emit('chat', {
      message: messageText,
      handle: username
    });
  }

  emitCollab(e) {
    this.socket.emit('collab', e);
  }

  emitIsTypingBroadcast(handle) {
    this.socket.emit('typing', handle);
    this.listenToIsTyping();
  }

  getCurrentActiveCount(): Observable<any> {
    return this.http.get(this.getCount);
  }

  restrictSession(sessId): Observable<any> {
    return this.http.get(this.restrictUser + sessId);
  }

  checkSession(sessId): Observable<any> {
    return this.http.get(this.checkUser + sessId);
  }

  getAllPosts(sessId): Observable<any> {
    return this.http.get(this.posts + sessId);
  }

  saveData(data): Observable<any> {
    return this.http.post(this.dataSave, data);
  }

  sendEmailInvite(userData: {}, emailList: []): Observable<any> {
    const params = { emailList, userData };
    console.log(params);
    return this.http.post(this.sendInvites, params);
  }

  saveSessionData(sessionData: {}): Observable<any> {
    return this.http.post(this.saveSession, sessionData);
  }

  joinSession(urlParam): Observable<any> {
    const reqUrl = this.redirectUser + urlParam;
    return this.http.get(reqUrl);
  }

  checkLinkAccess(sessCode, authCode): Observable<any> {
    const checkUrl = this.url + '/collab/checkuser';
    const params = {
      sessionCode: sessCode,
      accessToken: authCode
    };
    return this.http.post(checkUrl, params);
  }

  addUser(room: string) {
    console.log('into add user chat service ');
    this.socket.on('connect', () => {
      // call the server-side function 'adduser' and send one parameter (value of prompt)
      let user: string;
      console.log(localStorage.getItem('systemHandle'));
      if (localStorage.getItem('systemHandle') === 'null' || localStorage.getItem('systemHandle') === null) {
        user = prompt('Please enter your name');
        localStorage.setItem('systemHandle', user);
      }
      const userData = {
        username: user,
        roomName: room
      };
      this.socket.emit('addUser', userData);
    });
  }

  listenToAddUser(): Observable<any> {
    return Observable.create((observer) => {
      this.socket.on('updateCount', (data) => {
        console.log('user data ', data);
        observer.next(data);
      });
    });
  }

  listenToChatMessage(): Observable<Chat[]> {
    return Observable.create((observer) => {
      this.socket.on('chat', (data) => {
        observer.next(data);
      });
    });
  }

  listenToCollab(): Observable<Chat[]> {
    return Observable.create((observer) => {
      this.socket.on('collab', (data) => {
        observer.next(data);
      });
    });
  }

  eventListeners(eventType: string) {
    this.socket.on(eventType, (data) => {
      return data;
    });
  }

  listenToIsTyping() {
    this.socket.on('typing', (data) => {
      console.log(data + ' is typing');
    });
  }

}
