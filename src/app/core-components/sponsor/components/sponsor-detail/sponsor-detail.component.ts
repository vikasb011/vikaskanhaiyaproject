import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FetchDataService } from 'src/app/services/fetch-data.service';


@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.scss']
})
export class SponsorDetailComponent implements OnInit {
  public sponsorId;
  playerSource;
  sponsorDetail: any = [];
  sponsors: any = [];
  thumbVideos = [];
  event_id;
  imgUrl = './assets/images/first_slide1.jpg';
  msg;
  isShow = false;
  durationInSeconds = 5;
  video_status = null;
  chat_status = null;
  sponsor_id;
  video_room;
  chat_room;
  constructor(private route: ActivatedRoute, private fd: FetchDataService, private router: Router) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.queryParamMap.get('id'));
    this.sponsorId = id;
   // this.getDashboardData();
    this.getSponsorDetailData();
    this.getScheduleDemoOnloadStatus();
  }
  getSponsorDetailData() {
    this.fd.sponosrDetail(this.sponsorId).subscribe((res: any) => {
      this.sponsors = res.result;
      this.playerSource = this.sponsors.videos[0].video;
      this.thumbVideos = this.sponsors.videos;
    });
  }
  getVideo(thumb) {
    if (this.playerSource === thumb.video) {
      alert('This video is already playing');
    } else {
      this.playerSource = thumb.video;
    }

  }

  chatRequest(sponID) {
    console.log('id', sponID);
    let spon_id = sponID;
    let user_id = localStorage.getItem('user_id');
    const event = JSON.parse(localStorage.getItem('sessionData'));
    const eventId = event.id;
    this.fd.addRequestChat(eventId, spon_id, user_id).subscribe((res: any) => {
      localStorage.setItem('chatroom_id', res.result.room_id);
      if (res.room_id) {
          const add = setInterval(() => {
            this.fd.getChatRooms(this.event_id, user_id, spon_id).subscribe(room => {
            //  console.log('room', room.result);
              this.chat_status = room.result.chat_status;
              this.chat_room = room.result.chat_room;
              if (room.result.chat_status === 'approved') {
                this.chat_status = room.result.chat_status;
                clearInterval(add);
              }
            });
          }, 1000);

          // this.router.navigate(['/sponsor/chat-room'], {queryParams: {id:par.id, room_id: res.room_id}});
        }
    });
  }

  gotoChatroom() {
    this.router.navigate(['/sponsor/chat-room']);
  }
  getScheduleDemoOnloadStatus() {
    this.event_id = JSON.parse(localStorage.getItem('sessionData')).id;
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    this.route.queryParams.subscribe((par: Params) => {
      this.sponsor_id = par.id;
      this.fd.getChatRooms(this.event_id, user_id, par.id).subscribe(room => {
        this.video_status = room.result.video_status;
        this.chat_status = room.result.chat_status;
        console.log('sts', this.chat_status);
        this.video_room = room.result.video_room;
        this.chat_room = room.result.chat_room;
        if (room.result.chat_status === 'approved') {
          this.chat_status = room.result.chat_status;
        }
        if (room.result.video_status === 'approved') {
          this.video_status = room.result.video_status;
        }
      });
    });
  }
  scheduleDemo(id) {
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    const formData = new FormData();
    this.route.queryParams.subscribe((par: Params) => {
      this.sponsor_id = par.id;
      formData.append('event_id', this.event_id);
      formData.append('user_id', user_id);
      formData.append('sponsor_id', par.id);
      this.fd.requestSponsorVideoChat(formData).subscribe((res: any) => {
        localStorage.setItem('room_id', res.result.room_id);
        if (res.room_id) {
          const add = setInterval(() => {
            this.fd.getChatRooms(this.event_id, user_id, par.id).subscribe(room => {
              console.log('room', room.result);
              this.video_status = room.result.video_status;
              this.video_room = room.result.video_room;
              if (room.result.video_status === 'approved') {
                this.video_status = room.result.video_status;
                clearInterval(add);
              }
            });
          }, 1000);

          // this.router.navigate(['/sponsor/chat-room'], {queryParams: {id:par.id, room_id: res.room_id}});
        }
      });
    });
  }
  joinCall() {
    this.router.navigate(['/sponsor/chat-room'], {queryParams: {id: this.sponsor_id, room_id: this.video_room}});

  }
  getDashboardData() {
    const token = localStorage.getItem('token');
    localStorage.removeItem('sessionData');
    this.fd.getDashboardData(token).subscribe((res: any) => {
      localStorage.setItem('sessionData', JSON.stringify(res.result));
      localStorage.setItem('loadData', JSON.stringify(res.result));
    });
  }
  joinChat() {
    console.log("chat",this.chat_room);
    localStorage.setItem('chatroom_id',this.chat_room);
    this.isShow = true;
  }
}
