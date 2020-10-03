import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
  styleUrls: ['./all-sessions.component.scss']
})
export class AllSessionsComponent implements OnInit {
  allSessions: any = [];
  activeSessions = [];
  sessionDates = [];
  dateString;
  sessions = [];

  constructor() { }

  ngOnInit(): void {
    this.allSessions = JSON.parse(localStorage.getItem('sessionData'));
    this.sessionDates = Object.keys(this.allSessions.sessions);
    this.dateString = this.sessionDates[0];
    this.activeSessions = this.allSessions.sessions[this.dateString].session;
    this.sessions = Object.values(this.allSessions.sessions);
  }

  getDateSessions(date) {
    this.dateString = date;
    this.activeSessions = this.allSessions.sessions[date].session;
    
  }
}
