import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-session',
  templateUrl: './dashboard-session.component.html',
  styleUrls: ['./dashboard-session.component.scss']
})
export class DashboardSessionComponent implements OnInit {
  imgUrl = './assets/images/first_slide1.jpg';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
