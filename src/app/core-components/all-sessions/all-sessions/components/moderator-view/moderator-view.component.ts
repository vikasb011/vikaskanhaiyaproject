import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../../../../../services/fetch-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-moderator-view',
  templateUrl: './moderator-view.component.html',
  styleUrls: ['./moderator-view.component.scss']
})
export class ModeratorViewComponent implements OnInit {
  moderatorChat = [];
  participantsList = [];
  mytext = 'hello';
  pendingTweets = [];
  norecords = 'No Record Found';
  session_id;
  pollList:any = [];
  showStop=false;
  showpush= true;
  rasieHandPendingList = [];
  pendingList = [];
  constructor(private _fd: FetchDataService, private route: ActivatedRoute, private chatService: ChatService  ) { }

  ngOnInit(): void {
    this.getDashboardData();
    this.getPollList();
    this.getSessionParticipants();
    this.getallChats();
    this.getPendingTweets();
    setInterval(() => {
      this.getRaiseHandPendingList();
      this.getallChats();
      this.getPendingTweets();
      this.getPollList();
    }, 10000);
    // this.route.queryParams.subscribe((params: Params) => {
    //   this.chatService.checksessionchat(params.session_id, false);
    //   console.log('chats',params.session_id, false);
    // });
    this.route.queryParams.subscribe((params: Params) => {
      this.chatService.checksessionParticipants(params.session_id);
      // console.log('sesionparti',params.session_id);
    });
    //this.chatService.checkModPolls(localStorage.getItem('session_token'));
    // this.chatService.getChatlist().subscribe((data => {
    //   let d = JSON.parse(data);
    //   console.log('chtlist', d);
    //   this.moderatorChat = d;
    // }));
    this.chatService.getSessionParticipant().subscribe((data => {
      let d = JSON.parse(data);
     // console.log('reslutpst', d.result);
      this.participantsList = d.result;
    }));
  //   this.chatService.getModPollList().subscribe((data => {
  //     let d = JSON.parse(data);
  //     console.log('reslutpst', d.result);
  //     // this.pollList = d.result;
  //     for(let i=0; i<d.result.length;i++){
  // d.result[i].showStop=false;
  // d.result[i].showpush= true;
  //     }
  //     this.pollList = d.result;

  //   }));

  }

  getPollList(){
let sessionTOken = localStorage.getItem('session_token');
let token = '58b698f76ce2e';
this._fd.getPollModderator(token, sessionTOken).subscribe((res:any)=>{

  this.pollList = res.result;
  console.log('resmod',this.pollList);
})
  }

  getallChats(){
    this.route.queryParams.subscribe((params: Params) => {
      this.session_id = params.session_id;
      this._fd.getModeratorChat(this.session_id).subscribe((res: any) => {
      this.moderatorChat = res;
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
         // this.noBlankList = data.result;
        });
      });
    });
  }
  approveChat(id, data) {
    data.status = 'true';
    this._fd.approvModeratorChat(id, data).subscribe(res => {
      console.log('success', res);
      this.getallChats();
      this.route.queryParams.subscribe((params: Params) => {
      this.chatService.checksessionchat(params.session_id, true);
      //console.log('chats',params.session_id, false);
    });
    });
  }

  getPendingTweets(){
    this.route.queryParams.subscribe((params: Params)=> {
      this.session_id = params.session_id;
      this._fd.getPendingTweets(params.session_id).subscribe(res => {
        this.pendingTweets = res.result;
        console.log('ggg', this.pendingTweets)
      });
    });

  }
  approveTweets(event, index){
    this.pendingTweets.splice(index, 1);
    const formData: any =  new FormData();
    formData.append('id', event.id);
    formData.append('status', 1);
    formData.append('session_id', this.session_id);
    this._fd.postApproveTweets(formData).subscribe(res => {
      console.log('approved', res);
      this.route.queryParams.subscribe((params: Params) => {
        this.chatService.checktwitters(params.session_id,1);
        console.log('twset',params.session_id, 1);
      });
    })
  }

  getRaiseHandPendingList(){
    this.route.queryParams.subscribe((params: Params)=>{
      this._fd.getRaiseHandPendingList(params.session_id).subscribe((res: any) => {
        this.rasieHandPendingList = res.result;
        this.pendingList = [];
        res.result.forEach(element => {
          if(element.status === 'pending'){
            this.pendingList.push(element)
          }
        });
      })
    });
  }

  getPollPush(id,index){
    let session_token = localStorage.getItem('session_token');
    //console.log('pushpol',id);
    this._fd.pushPolllist(session_token,id).subscribe(res =>{
      console.log('polres',res);
      this.chatService.checkPolllist(localStorage.getItem('session_token'));
      this.getPollList();
      // this.pollList[index].showStop = true;
      // this.pollList[index].showpush = false;

    })
  }
  getstopPush(id,index){
    let session_token = localStorage.getItem('session_token');
    this._fd.stopPolllist(session_token,id).subscribe(res =>{
      console.log('stoppoll',res);
      this.chatService.checkPolllist(localStorage.getItem('session_token'));
      this.getPollList();
      // this.pollList[index].showStop = false;
      // this.pollList[index].showpush = true;
    });
  };
  showResult(id,index){
    let session_token = localStorage.getItem('session_token');
    this._fd.showPolllist(session_token,id).subscribe(res =>{
      console.log('pollresult',res);
    //  this.chatService.checkPolllist(localStorage.getItem('session_token'));
      this.getPollList();
      // this.pollList[index].showStop = false;
      // this.pollList[index].showpush = true;
    });
  };
  toggleApproveCall(listApprove: any) {
    const formData: any =  new FormData();
    console.log('req', listApprove)
    formData.append('session_id', listApprove.session_id);
    formData.append('user_id', listApprove.user_id);
    this.route.queryParams.subscribe((params: Params)=>{
      if(listApprove.status === 'pending') {
        formData.append('status', 'approved');
        this._fd.approveAudienceCall(formData).subscribe(approve => {
          this._fd.getRaiseHandPendingList(params.session_id).subscribe(res => {
            this.rasieHandPendingList = res.result;
            this.pendingList = [];
            res.result.forEach(element => {
              if(element.status === 'pending'){
                this.pendingList.push(element)
              }
            });
          });
        });
      }
      // if(listApprove.status === 'approved') {
      //   formData.append('status', 'pending');
      //   this._fd.approveAudienceCall(formData).subscribe(res => {
      //     this._fd.getRaiseHandPendingList(params.session_id).subscribe(res => {
      //       this.rasieHandPendingList = res.result;
      //     });
      //   });
      // }
    });

  }
}
