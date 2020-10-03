import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FetchDataService } from '../../../../../services/fetch-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-audience-view',
  templateUrl: './audience-view.component.html',
  styleUrls: ['./audience-view.component.scss']
})
export class AudienceViewComponent implements OnInit, OnDestroy {
  participantsList = [];
  noBlankList = [];
  session_id;
  chatlist = [];
  myText='';
  msgs;
  dashboardData: any = [];
  sessions: any = [];
  roleData:any =[];
  show = false;
  polling;
  url;
  showPoll = true;
  showMsg = false;
  messagePoll;
  approvedTweets = [];
  norecords = 'No Records Found';
  pollList:any = [];
  pollForm = new FormGroup({
    polling: new FormControl(''),
    //email: new FormControl('', [Validators.required, Validators.email]),
    //password: new FormControl(''),
  });
  constructor(private _fd: FetchDataService, private route: ActivatedRoute, private router:Router, private chatService: ChatService) { }

  ngOnInit(): void {
    this.getDashboardData();
    //console.log('ji',window.location.href);
    this.url = window.location.href;
    this.getSessionParticipants();
    //this.getAudeinceChat();
   // this.getTwitterChat();
  //  this.getPollList();
    this.route.params.subscribe((params: Params) => {
    this.chatService.checksessionchat(params.session_id,true);
    //// console.log('chats',params.session_id, true);
  });
    this.route.params.subscribe((params: Params) => {
      this.chatService.checksessionParticipants(params.session_id);
     // // console.log('sesionparti',params.session_id);
    });
    this.chatService.checkPolllist(localStorage.getItem('session_token'));
  // this.route.params.subscribe((params: Params) => {
  //     this.chatService.checkPolllist(params.session_id);
  //     // console.log('pllls',params.session_id);
  //     });
    this.route.params.subscribe((params: Params) => {
      this.chatService.checktwitters(params.session_id,1);
      //console.log('twset',params.session_id, 1);
    });

    this.chatService.getSessionParticipant().subscribe((data => {
      let d = JSON.parse(data);
     // console.log('reslutpst', d.result);
      this.participantsList = d.result;
    }));
    this.chatService.getPollList(localStorage.getItem('session_token')).subscribe((data => {
      console.log('polls', data);
      console.log('data',data[0]);
      let checkData = data[0];
      setTimeout(() => {
        console.log('checkc',checkData._id);
        if(data[0]._id){
          console.log('data coming');
        this.pollList = data;
        this.showPoll = true;
        this.showMsg = false;
      //  alert('thisone');
      }
      else{
        this.messagePoll = JSON.parse(data);
        this.showPoll = false;
        this.showMsg = true;
       // alert(this.messagePoll.message);
      }
      }, 100);
      this.pollList = data;
     // alert('abs');
      //console.log('datacheck',data[0].status);
     // alert('data');
     // let d = JSON.parse(data[0]);
      //console.log(d._id);
      //this.pollList = data;
      //alert(data[0]._id);
      // if(data[0]._id){
      //   this.pollList = data;
      // //  alert('thisone');
      // }
      // else{
      //   this.messagePoll = JSON.parse(data);
      //   alert(this.messagePoll.message);
      // }
      }));
    this.chatService.getTweetslist().subscribe((data => {
      let d = JSON.parse(data);
      console.log('tweets', d.result);
      this.approvedTweets = d.result;
    }));
    this.chatService.getChatlist().subscribe((data => {
      let d = JSON.parse(data);
    //  console.log('chtlist', d);
      this.chatlist = d;
    }));

  }
  getDashboardData() {
    const token = localStorage.getItem('token');
    localStorage.removeItem('sessionData');
    this._fd.getDashboardData(token).subscribe((res: any) => {
      localStorage.setItem('sessionData', JSON.stringify(res.result));
      localStorage.setItem('loadData', JSON.stringify(res.result));
    });
  }
  getPolls(pollid){
    console.log('voteval',this.pollForm.value);
    this.roleData = JSON.parse(localStorage.getItem('logindata'));
    console.log(this.roleData);
    let session_token = localStorage.getItem('session_token');
    this.chatService.pushVote(pollid,session_token,this.pollForm.value.polling, this.roleData.email, this.roleData.name);
    this.show = true;
  }
  getAudeinceChat(){
    this.route.params.subscribe((params: Params) => {
      this._fd.getAudienceAndSponsorChat(params.session_id).subscribe(res=>{
        this.chatlist = res;
        // console.log('chatlist',this.chatlist);
      });
    });
  }
  getValue(value,id){
    // console.log('val',value);
    // console.log('id',id);
    this.roleData = JSON.parse(localStorage.getItem('logindata'));
    console.log(this.roleData);
    let session_token = localStorage.getItem('session_token');
    this.chatService.pushVote(id,session_token,value, this.roleData.email, this.roleData.name);
    this.show = true;
  }
  sendMessage() {
    let loginData = JSON.parse(localStorage.getItem('logindata'));
    // console.log(loginData.name);
    let user_name = loginData.name;
    this.route.params.subscribe((params: Params) => {
     // const formData: any =  new FormData();
      const data ={
        'user_id': params.user_id,
        'message': this.msgs,
        'user_name': user_name,
        'status': 'false',
        'eventname': params.session_id
      };
    //  // console.log('data',JSON.stringify(data));
      // formData.append('user_id', params.user_id);
      // formData.append('message', this.msgs);
      // formData.append('user_name', user_name);
      // formData.append('status', 'false');
      // formData.append('eventname', params.session_id);
      this._fd.postAudienceChat(data).subscribe(res =>{
        // console.log('send data', res);
        this.msgs ='';
      });
    });
  }
  getSessionParticipants() {
    this.route.params.subscribe((params: Params) => {
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
    // console.log('posted',key);
    this._fd.getSearchSessionParticipants(this.session_id, key).subscribe((res: any)=> {
      this.participantsList = res.result;
    }, err => {
      if (err.status === 404){
        this.participantsList = this.noBlankList;
      }
    })
  }

  audienceChat(key) {
      this.myText='';
  }
  ngOnDestroy(){
    //  let val = confirm("Do you want to exit this page ?");
    //  if( val == true ) {
    //     return true;
    //  } else {
    //   // window.location.reload();
    //   console.log('newurl',this.url);
    //  // this.router.navigate(this.url);
    //   window.location.href = this.url;

    //  }
    }
  // getTwitterChat() {
  //   this.route.params.subscribe((params: Params) => {
  //     this._fd.getApprovedTweets(params.session_id).subscribe((res: any) => {
  //       this.approvedTweets = res.result;
  //     })
  //   });
  // }

  // getPollList(){
  //   this.route.params.subscribe((params: Params)=>{
  //     let token = localStorage.getItem('token');
  //     let user_id = params.user_id;
  //     let poll_id = '5e7db7026a12a520dc549da2';
  //     this._fd.getPolls(token, user_id, poll_id).subscribe(res => {
  //       this.pollList = res.result;
  //       console.log('polls', this.pollList);
  //    })
  //   })
  // }
}
