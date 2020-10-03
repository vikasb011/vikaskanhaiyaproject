import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  // styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
