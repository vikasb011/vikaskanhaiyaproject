import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ssponsor',
  templateUrl: './ssponsor.component.html',
  styleUrls: ['./ssponsor.component.scss']
})
export class SsponsorComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    console.log('destroyed');
  }
}
