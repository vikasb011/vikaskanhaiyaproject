import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../../../../../services/fetch-data.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-initiators',
  templateUrl: './initiators.component.html',
  styleUrls: ['./initiators.component.scss']
})
export class InitiatorsComponent implements OnInit {

  sponsorData :any =[];
  sponsorName;
  listData :any =[];
  sponStatus;
  showChat =false;
  scheduleDemoList = [];
  constructor(private fd: FetchDataService, private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {
  //  this.getDashboardData();
    this.sponsorName = JSON.parse(localStorage.getItem('logindata'));
    let event_id = JSON.parse(localStorage.getItem('sessionData')).id;
    console.log('eventid',event_id);
    let sponsor_id = this.sponsorName.id;
    //this.getScheduleDemoList();
    let token = localStorage.getItem('token');
    this.chatService.checksponsorlead(token, sponsor_id);
    console.log(token);
    this.chatService.sponsorleadList().subscribe((data => {
       let d = JSON.parse(data);
      console.log('leads', data);
      this.sponsorData = d.result;
    }));

    this.chatService.checksponsorchat(event_id, sponsor_id);
    this.chatService.sponsorChatList().subscribe((data => {
       let d = JSON.parse(data);
      //console.log('chat', data);
      this.listData  = d.result;
    }));

    this.chatService.checksponsorvideos(event_id, sponsor_id);
   // console.log('chck vides',event_id, sponsor_id);
    this.chatService.videoRequestList().subscribe((data => {
       let d = JSON.parse(data);
      console.log('videos', data);
      this.scheduleDemoList = d.result;
    }));

  }
  getScheduleDemoList() {
    let event_id = JSON.parse(localStorage.getItem('sessionData')).id;
    let sponsor_id = this.sponsorName.id;
    this.fd.fetchScheduleDemoList(event_id, sponsor_id).subscribe(res => {
      this.scheduleDemoList = res.result;
    });
  }
  getgeneratedLeads(){
    let token = localStorage.getItem('token');
    let id = JSON.parse(localStorage.getItem('user_id'));
    this.fd.getSponsorlead(token, id).subscribe((res: any) => {
      this.sponsorData = res.result;
    });
  }

  getChatRequests(){
    let event = JSON.parse(localStorage.getItem('sessionData'));
    let eventId = event.id;
    let id = JSON.parse(localStorage.getItem('user_id'));
    this.fd.listChatRequests(eventId, id).subscribe((res: any)=> {
      this.listData = res.result;
    });
  }
     approveRequest(usrId, status){
      if (status === 'pending'){
      this.sponStatus = 'approved';
      // this.showChat = true;
      console.log(this.sponStatus);
    }
      if (status === 'approved'){
      this.sponStatus = 'pending';
      console.log(this.sponStatus);
    }
      let event = JSON.parse(localStorage.getItem('sessionData'));
      let eventId = event.id;
      let id = JSON.parse(localStorage.getItem('user_id'));
       this.fd.requestApproved(this.sponStatus, eventId, id, usrId).subscribe((res: any)=> {
        console.log(res.room_id);

        localStorage.setItem('room_id', res.room_id);
        //this.showChat = true;
        this.getChatRequests();
      });
  }
  room_id;
  StartVideoChat(req:any) {
    const formData = new FormData();
    formData.append('status', 'approved');
    formData.append('event_id', req.event_id);
    formData.append('user_id', req.user_id);
    formData.append('sponsor_id', this.sponsorName.id);
    this.fd.approvScheduleDemo(formData).subscribe(res => {
      this.room_id = res.room_id;
      this.getScheduleDemoList();

      // this.router.navigate(['/leads/lead-chat-room'], {queryParams:{id:this.sponsorName.id, room_id: res.room_id}});
    });
  }
  joinCall(req:any) {
    console.log('dd', req.videoroom);
    this.router.navigate(['/leads/lead-chat-room'], {queryParams:{id:this.sponsorName.id, room_id: req.videoroom}});
  }
  getDashboardData() {
    const token = localStorage.getItem('token');
    localStorage.removeItem('sessionData');
    this.fd.getDashboardData(token).subscribe((res: any) => {
      localStorage.setItem('sessionData', JSON.stringify(res.result));
      localStorage.setItem('loadData', JSON.stringify(res.result));
    });
  }
  joinChat(chat:any){
    localStorage.setItem('chatroom_id',chat.chatroom);
    this.showChat = true;
  }
}
