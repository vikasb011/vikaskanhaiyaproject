import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FetchDataService } from '../../../../../services/fetch-data.service';
import { ChatService } from 'src/app/services/chat.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-sponsor-view',
  templateUrl: './sponsor-view.component.html',
  styleUrls: ['./sponsor-view.component.scss']
})
export class SponsorViewComponent implements OnInit {
  participantsList = [];
  noBlankList = [];
  session_id;
  chatlist = [];
  msgs;
  showPoll = true;
  showMsg = false;
  messagePoll;
  roleData: any = [];
  show = false;
  pollList = [];
  approvedTweets = [];
  norecords = 'No Records Found';
  pollForm = new FormGroup({
    polling: new FormControl(''),
    //email: new FormControl('', [Validators.required, Validators.email]),
    //password: new FormControl(''),
  });
  constructor(private _fd: FetchDataService, private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit(): void {
    this.getDashboardData();
    this.getSessionParticipants();
   // this.getsponsorChat();
  //  this.getApprovedTweets();
    this.chatService.checkPolllist(localStorage.getItem('session_token'));
    this.route.queryParams.subscribe((params: Params) => {
    this.chatService.checksessionchat(params.session_id, true);
    console.log('chats', params.session_id, true);
  });
    this.route.queryParams.subscribe((params: Params) => {
    this.chatService.checksessionParticipants(params.session_id);
    console.log('sesionparti', params.session_id);
  });
    this.route.queryParams.subscribe((params: Params) => {
    this.chatService.checktwitters(params.session_id, 1);
    console.log('twset', params.session_id, 1);
  });
    this.chatService.getPollList(localStorage.getItem('session_token')).subscribe((data => {
    console.log('polls', data);
    console.log('data', data[0]);
    const checkData = data[0];
    setTimeout(() => {
      console.log('checkc', checkData._id);
      if (data[0]._id) {
        console.log('data coming');
        this.pollList = data;
        this.showPoll = true;
        this.showMsg= false;
    //  alert('thisone');
    } else {
      this.messagePoll = JSON.parse(data);
      this.showPoll = false;
      this.showMsg = true;
     // alert(this.messagePoll.message);
    }
    }, 100);

   // alert('abs');
    // console.log('datacheck',data[0].status);
   // alert('data');
   // let d = JSON.parse(data[0]);
    // console.log(d._id);
    // this.pollList = data;
    // alert(data[0]._id);
    // if(data[0]._id){
    //   this.pollList = data;
    // //  alert('thisone');
    // }
    // else{
    //   this.messagePoll = JSON.parse(data);
    //   alert(this.messagePoll.message);
    // }
    }));
    this.chatService.getChatlist().subscribe((data => {
    const d = JSON.parse(data);
    console.log('chtlist', d);
    this.chatlist = d;
  }));
    this.chatService.getSessionParticipant().subscribe((data => {
    const d = JSON.parse(data);
   // console.log('reslutpst', d.result);
    this.participantsList = d.result;
  }));

    this.chatService.getTweetslist().subscribe((data => {
    const d = JSON.parse(data);
    console.log('tweets', d.result);
    this.approvedTweets = d.result;
  }));
  }
  getsponsorChat() {
    this.route.queryParams.subscribe((params: Params) => {
      this._fd.getAudienceAndSponsorChat(params.session_id).subscribe(res => {
        this.chatlist = res;
      });
    });
  }
  getValue(value, id) {
    // console.log('val',value);
    // console.log('id',id);
    let session_token = localStorage.getItem('session_token');
    this.roleData = JSON.parse(localStorage.getItem('logindata'));
    this.chatService.pushVote(id, session_token, value, this.roleData.email, this.roleData.name);
    this.show = true;
  }
  getPolls(pollid) {
    console.log('voteval', this.pollForm.value);
    this.roleData = JSON.parse(localStorage.getItem('logindata'));
    console.log(this.roleData);
    let session_token = localStorage.getItem('session_token');
    this.chatService.pushVote(pollid, session_token, this.pollForm.value.polling, this.roleData.email, this.roleData.name);
    this.show = true;
  }
  getDashboardData() {
    const token = localStorage.getItem('token');
    localStorage.removeItem('sessionData');
    this._fd.getDashboardData(token).subscribe((res: any) => {
      localStorage.setItem('sessionData', JSON.stringify(res.result));
      localStorage.setItem('loadData', JSON.stringify(res.result));
    });
  }
  sendMessage() {
    const loginData = JSON.parse(localStorage.getItem('logindata'));
    // console.log(loginData.name);
    let user_name = loginData.name;
    this.route.queryParams.subscribe((params: Params) => {

      const data = {
        user_id: params.user_id,
        message: this.msgs,
        user_name: user_name,
        status: 'false',
        eventname: params.session_id
      };
      this._fd.postAudienceChat(data).subscribe(res => {
        console.log('send data', res);
        this.msgs = '';
      });
    });
  }
  getSessionParticipants() {
    this.route.queryParams.subscribe((params: Params) => {
      this.session_id = params.session_id;
      const formData = new FormData();
      formData.append('user_id', params.user_id);
      formData.append('event_id', params.event_id);
      formData.append('session_id', params.session_id);
      this._fd.registerSession(formData).subscribe(res => {
        this._fd.getSessionParticipants(params.session_id).subscribe((data: any) => {
          this.participantsList = data.result;
          this.noBlankList = data.result;
        });
      });
    });
  }
  searchParticipants(key) {
    console.log('posted', key);
    this._fd.getSearchSessionParticipants(this.session_id, key).subscribe((res: any) => {
      this.participantsList = res.result;
    }, err => {
      if (err.status === 404) {
        this.participantsList = this.noBlankList;
      }
    });
  }

  speakerChat(key) {

  }
  // getApprovedTweets(){
  //   this.route.params.subscribe((params: Params) => {
  //     this._fd.getApprovedTweets(params.session_id).subscribe((res: any) => {
  //       this.approvedTweets = res.result;
  //     })
  //   });
  // }

  // getPollList(){
  //   this.route.params.subscribe((params: Params)=>{
  //     let token = '58b698f76ce2e';
  //     let user_id = params.user_id;
  //     let poll_id = '5e7db7026a12a520dc549da2';
  //     this._fd.getPolls(token, user_id, poll_id).subscribe(res => {
  //       this.pollList = res.result;
  //    })
  //   })
  // }
}
