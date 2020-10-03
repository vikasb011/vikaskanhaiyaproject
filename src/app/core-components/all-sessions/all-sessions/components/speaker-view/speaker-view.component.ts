import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchDataService } from '../../../../../services/fetch-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from '../../../../../services/message.service';
import { Subscription } from 'rxjs';
import { DataService } from '../../../../../services/data.service';
import { ChatService } from 'src/app/services/chat.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-speaker-view',
  templateUrl: './speaker-view.component.html',
  styleUrls: ['./speaker-view.component.scss']
})
export class SpeakerViewComponent implements OnInit, OnDestroy {
  participantsList = [];
  noBlankList = [];
  session_id;
  chatlist = [];
  pollList = [];
  msgs;
  showPoll = true;
  showMsg = false;
  messagePoll;
  totalPoll;
  pollpercent = [];
  roleData:any =[];
  show = false;
  approvedTweets = [];
  norecords = 'No Records Found';
  sessions=[];
  sessionToken;
  speakers = [];
  speaker_userId;
  subscription:Subscription;
  message: any = {};
  user_id;
  speaker_id;
  pollForm = new FormGroup({
    polling: new FormControl(''),
    //email: new FormControl('', [Validators.required, Validators.email]),
    //password: new FormControl(''),
  });
  constructor(private _fd: FetchDataService, private route: ActivatedRoute, private msgService:MessageService, private dataservice: DataService, private chatService :ChatService) {
    this.user_id  = JSON.parse(localStorage.getItem('user_id'));
    this.speaker_id  = JSON.parse(localStorage.getItem('speaker_id'));
    this.dataservice.currentUser.subscribe(res => {
      this.speakers = res.speakers;
      this.sessionToken = res.session_token;
      // this.speakers.forEach(element => {
      //   if(element.id === this.user_id) {
      //     this.speaker_id = element.id;
      //   }
      // });
    })
  }

  ngOnInit(): void {
    this.getDashboardData();
    this.getSessionParticipants();
    // this.getspeakerChat();
   // this.getApprovedTweets();
    this.chatService.checkPolllist(localStorage.getItem('session_token'));
    this.route.queryParams.subscribe((params: Params) => {
    this.chatService.checksessionchat(params.session_id,true);
   // console.log('chats',params.session_id, true);
  });
    this.route.queryParams.subscribe((params: Params) => {
    this.chatService.checksessionParticipants(params.session_id);
   // console.log('sesionparti',params.session_id);
  });
    this.route.queryParams.subscribe((params: Params) => {
    this.chatService.checktwitters(params.session_id,1);
   // console.log('twset',params.session_id, 1);
  });

    this.chatService.getSessionParticipant().subscribe((data => {
    let d = JSON.parse(data);
   // console.log('reslutpst', d.result);
    this.participantsList = d.result;
  }));
    this.chatService.getChatlist().subscribe((data => {
    let d = JSON.parse(data);
  //  console.log('chtlist', d);
    this.chatlist = d;
  }));
    this.chatService.getPollList(localStorage.getItem('session_token')).subscribe((data => {
    console.log('polls', data);
    console.log('data',data[0]);

    setTimeout(() => {
      let checkData = data[0];
     // console.log('choice',checkData.choice);
      // for(let j = 0; j< checkData.choice.length; j++){
      //  // console.log('jjjj',checkData.choice[j].vote);
      //   this.totalPoll= Math.round (checkData.choice[j].vote / checkData.totalvote * 100) +'%';
      //   console.log('totlaing', this.totalPoll);
      //   this.pollpercent.push(this.totalPoll);
      // }
      //this.totalPoll= Math.round (checkData.vote / result[0].totalvote * 100) +'%'
      console.log('checkc',checkData._id);
      if(data[0]._id){
        console.log('data coming');
        //this.pollList = data;
      //alert('thisone');
      this.pollList = data;
      this.showPoll = true;
      this.showMsg= false;
      //alert(data);
    }
    else{
      this.messagePoll = JSON.parse(data);
      this.showPoll = false;
      this.showMsg = true;
     // alert(this.messagePoll.message);
    }
    }, 100);

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

  }


  getspeakerChat(){
    this.route.queryParams.subscribe((params: Params) => {
      this._fd.getAudienceAndSponsorChat(params.session_id).subscribe(res=>{
        this.chatlist = res;
      //   setTimeout(() => {
      //     this.getspeakerChat();
      // }, 10000);
      });
    });
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
  getValue(value,id){
   // console.log('val',value);
    //console.log('id',id);
    let session_token = localStorage.getItem('session_token');
    this.roleData = JSON.parse(localStorage.getItem('logindata'));
    this.chatService.pushVote(id,session_token,value,this.roleData.email, this.roleData.name);
    this.show = true;
  }
  sendMessage() {
    let loginData = JSON.parse(localStorage.getItem('logindata'));
    // console.log(loginData.name);
    let user_name = loginData.name;
    this.route.queryParams.subscribe((params: Params) => {

      const data ={
        'user_id': params.user_id,
        'message': this.msgs,
        'user_name': user_name,
        'status': 'false',
        'eventname': params.session_id
      };
      this._fd.postAudienceChat(data).subscribe(res =>{
       // console.log('send data', res);
        this.msgs ='';
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
  //  console.log('posted',key);
    this._fd.getSearchSessionParticipants(this.session_id, key).subscribe((res: any)=> {
      this.participantsList = res.result;
    }, err => {
      if (err.status === 404){
        this.participantsList = this.noBlankList;
      }
    })
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
  ngOnDestroy(){
  console.log('kkkkhjkh');
  }
}
