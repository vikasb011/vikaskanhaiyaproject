import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { FetchDataService } from '../../../services/fetch-data.service';
import { OwlOptions} from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  imgUrl = './assets/images/first_slide1.jpg';
  user: SocialUser;
  loggedIn: boolean;
  newUser: any;
  dashboardData: any = [];
  sessions: any = [];
  speakers: any = [];
  sponsors: any = [];
  sessionClass;
  loggedinUsersList = [];
  constructor(private _fd: FetchDataService, private router: Router, private authService: AuthService, ) { }

  ngOnInit(): void {
    this.getDashboardData();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.newUser = JSON.stringify(this.user);
      this.loggedIn = (user != null);
      // console.log(this.newUser);
      if (this.newUser != 'null') {
        console.log('ok');

      }
    });
  }

  signInWithFb(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  getDashboardData() {
    const token = localStorage.getItem('token');
    localStorage.removeItem('sessionData');
    this._fd.getDashboardData(token).subscribe((res: any) => {
      localStorage.setItem('sessionData', JSON.stringify(res.result));
      this.dashboardData = res.result;
      localStorage.setItem('loadData', JSON.stringify(res.result));
      // this.sessions.push(res.result.sessions);
      let sessions = [];
      let liveUpcoming=[]
      sessions = Object.values(res.result.sessions);
      let activesessions = []
      sessions.forEach(element => {
        activesessions.push(element.session)
      });
      for(var i = 0; i < activesessions.length; i++){
        liveUpcoming = liveUpcoming.concat(activesessions[i]);
      }
      for (let k = 0; k < liveUpcoming.length; k++) {
        if(liveUpcoming[k].status !== 'completed'){
          this.sessions.push(liveUpcoming[k]);
        }
      }
      // this.sessions = liveUpcoming;
      // if (res.result.sessions['2020-06-04']) {
      //   this.sessions.push(res.result.sessions['2020-06-04'].session[0], res.result.sessions['2020-06-05'].session[0]);
      //   if (this.sessions.length <= 2) {
      //     this.sessionClass = 'col-xl-6 col-md-6 p-2';
      //   }
      // } else {
      //     this.sessions.push(res.result.sessions['2020-05-20'].session[0], res.result.sessions['2020-05-13'].session[0]);
      //     if (this.sessions.length <= 2) {
      //       this.sessionClass = 'col-xl-6 col-md-6 p-2';
      //      }
      //     }



      // console.log('sessionss', Object.values(this.sessions[0]));

    //   if(this.sessions[0] == undefined){
    //     this.sessions.push(res.result.sessions['2020-06-04']['session'][0], res.result.sessions['2020-06-05']['session'][0]);
    //     if (this.sessions.length <= 2) {
    //       this.sessionClass = 'col-xl-6 col-md-6 p-2';
    //     }
    //   }else{
    //   this.sessions.push(res.result.sessions['2020-05-20']['session'][0], res.result.sessions['2020-05-13']['session'][0]);
    //   if (this.sessions.length <= 2) {
    //     this.sessionClass = 'col-xl-6 col-md-6 p-2';
    //   }
    // }
      this.sponsors.push(res.result.sponsors);
      this.speakers.push(res.result.speakers);
    });
  }
  gotoDashboarSession(session, index) {
    let event_id = index+1;
    let session_id = session.id;
    let status = session.status;
    const user_id = JSON.parse(localStorage.getItem('user_id'));
    let role_id: number = JSON.parse(localStorage.getItem('role_id'));
    let speakers:any = [];
    let speaker_id;
    speakers = session.speakers;
    let sessionSpeakers:any = []
    let sessionToken = session.session_token;
    localStorage.setItem('session_token', session.session_token);
    localStorage.setItem('banner', session.banner);
    localStorage.setItem('video-player', session.video);
    localStorage.setItem('session-speakers', JSON.stringify(speakers));
    if (role_id === 1) {
      this.router.navigate(['/all-sessions/audience-view', user_id, event_id, session_id, status]);
    }
    if (role_id === 2) {
      // this.service.sendSession(session);
      speakers.forEach(element => {
        if(user_id === element.id) {
          localStorage.setItem('speaker_id', element.id);
          // console.log('speakerid',element)
          speaker_id = element.id;
        } else {
          localStorage.removeItem('speaker_id');
          sessionSpeakers.push(element);
        }
      });

      this.router.navigate(['/all-sessions/speaker-view'], {queryParams: {role_id: role_id,event_id: event_id, session_id: session_id, user_id: user_id, session_token: sessionToken, speaker_id: speaker_id, status: session.status}});
    }
    if (role_id === 3) {
      this.router.navigate(['/all-sessions/sponsor-view'], {queryParams: {role_id: role_id, event_id: event_id, session_id: session_id, user_id: user_id, status: session.status}});
    }
    if (role_id === 4) {

      this.router.navigate(['/all-sessions/moderator-view'], {queryParams: {role_id: role_id, event_id: event_id, session_id: session_id, user_id: user_id, status: session.status}});
    }
  }

  getLoggedinUsersList() {
    let event_id = JSON.parse(localStorage.getItem('logindata'));
    this._fd.getLoggedinUsersList(event_id).subscribe((res: any) => {
      this.loggedinUsersList = res.result;
    });
  }
  ngAfterViewInit() {
    this.getLoggedinUsersList();
  }
}
