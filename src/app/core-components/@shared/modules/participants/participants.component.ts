import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../../../../services/fetch-data.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  loggedinUsersList = [];
  noBlankUsersList = [];
  event_id;
  response;
  responseStatus = false;
  constructor(private _fd: FetchDataService, private chatService: ChatService) { }

  ngOnInit(): void {
    //this.getLoggedinUsersList();
    // console.log('logindatas', localStorage.getItem('logindata'));
    this.loginuserlist();
    this.chatService.getParticipant().subscribe((data) => {
      let d = JSON.parse(data);
      // console.log('result',  d.result);
      this.loggedinUsersList = d.result;
    });
  }
  loginuserlist() {
   // console.log(localStorage.getItem('loadData'));
    this.event_id = JSON.parse(localStorage.getItem('logindata')).event_id;
    this.chatService.checkParticipant(this.event_id);
    // console.log('participants', this.event_id);
  }
  // getLoggedinUsersList() {
  //   this.event_id = JSON.parse(localStorage.getItem('logindata')).event_id;
  //   this._fd.getLoggedinUsersList(this.event_id).subscribe((res: any)=> {
  //     this.loggedinUsersList = res.result;
  //   });
  // }

  searchUsersList(key) {
    if(key===''){
      this._fd.getLoggedinUsersList(this.event_id).subscribe((res: any)=> {
        this.responseStatus = false;
        this.loggedinUsersList = res.result;
      });    
      } else{
      this._fd.getSearchLoggedinUsersList(this.event_id, key).subscribe((res: any)=>{
        this.responseStatus = false;
        this.loggedinUsersList = res.result;
      if (res.result.length === 0) {
        this.responseStatus = true;
        this.response = 'No user on this name';
      }
    });
    }
  }
}
