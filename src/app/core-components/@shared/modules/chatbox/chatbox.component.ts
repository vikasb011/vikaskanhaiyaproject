import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
isShow = true;
newMessage: string;
  msgs: string;
  newMSg =[];
  showDiv = true;
  showchat = true;
  hidechat = false;
  messageList = [];
  roomName: string;
  uName;
  constructor(private chatService: ChatService) {
    //console.log('chat box caledd');
    const localData = localStorage.getItem('chatroom_id');
    console.log('room id from chat  ima your room id', localData);
  }

  // randomstring() {
  //   this.roomName = 'abc';
  //   const chars =
  //     '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  //   const stringLength = 10;
  //   let randomstring = '';
  //   for (let i = 0; i < stringLength; i++) {
  //     const rnum = Math.floor(Math.random() * chars.length);
  //     randomstring += chars.substring(rnum, rnum + 1);
  //   }
  //   localStorage.setItem('username', randomstring);
  //   var user = localStorage.getItem('username');
  //   this.chatService.addUser(user, this.roomName);
  // }

  sendMessage() {
    this.roomName = 'ddbjb1bk';
    if (this.msgs != '') {
      this.chatService.sendMessage(this.msgs, this.uName, this.roomName);
      this.msgs = '';
    }
  }

  hidediv(){
this.showDiv = false;
this.showchat = false;
this.hidechat = true;
  }
  show(){
    this.showDiv = true;
    this.hidechat = false;
this.showchat = true;
      }

  ngOnInit(): void {
    this.getUser();
    this.chatService.getMessages().subscribe((newMSg) => {
        console.log('check data', newMSg);
        this.messageList.push(newMSg);
        console.log(this.messageList);
      });

  }

  getUser(){
    let user = JSON.parse(localStorage.getItem('logindata'));
    this.uName = user.name;
  //  console.log(this.uName);
   // let room = JSON.parse(localStorage.getItem('room_id'));
    //console.log(room);
    this.roomName = 'ddbjb1bk';
    this.chatService.addUser(this.uName, this.roomName);
  }
  // toggleDisplay(){
  //   this.isShow = false;
  // }
}
