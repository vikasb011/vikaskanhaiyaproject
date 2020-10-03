import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  imgUrl = './assets/images/2ndslide.jpg';
  constructor() { }

  ngOnInit(): void {
  }
}
