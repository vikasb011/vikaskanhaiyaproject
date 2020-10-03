import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataService } from '../../../../../services/fetch-data.service';
import { MessageService } from '../../../../../services/message.service';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-reg-session',
  templateUrl: './reg-session.component.html',
  styleUrls: ['./reg-session.component.scss']
})
export class RegSessionComponent implements OnInit {
  allSessions: any = [];
  activeSessions = [];
  sessionDates = [];
  dateString;
  sessions = [];
  date = new Date();
  constructor(private router: Router, private _fd: FetchDataService, private service:MessageService,
    private dataservice: DataService) { }

  ngOnInit(): void {
    this.allSessions = JSON.parse(localStorage.getItem('sessionData'));
    this.sessionDates = Object.keys(this.allSessions.sessions);
    this.dateString = this.sessionDates[0];
    this.activeSessions = this.allSessions.sessions[this.dateString].session;
    this.sessions = Object.values(this.allSessions.sessions);
    // console.log('lll', this.sessions)
  }

  getDateSessions(date) {
    this.dateString = date;
    this.activeSessions = this.allSessions.sessions[date].session;

  }

  gotoWelcomeSession(session: any, index){
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

      this.dataservice.setUser(session);
      this.router.navigate(['/all-sessions/speaker-view'], {queryParams: {role_id: role_id,event_id: event_id, session_id: session_id, user_id: user_id, session_token: sessionToken, speaker_id: speaker_id, status: session.status}});
    }
    if (role_id === 3) {
      this.router.navigate(['/all-sessions/sponsor-view'], {queryParams: {role_id: role_id, event_id: event_id, session_id: session_id, user_id: user_id, status: session.status}});
    }
    if (role_id === 4) {

      this.router.navigate(['/all-sessions/moderator-view'], {queryParams: {role_id: role_id, event_id: event_id, session_id: session_id, user_id: user_id, status: session.status}});
    }
  }
}
