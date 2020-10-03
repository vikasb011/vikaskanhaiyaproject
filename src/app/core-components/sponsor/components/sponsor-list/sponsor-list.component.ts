import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataService } from '../../../../services/fetch-data.service';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.scss']
})
export class SponsorListComponent implements OnInit {
  sponsorData: any = [];
  sponsors = [];
  userId;
  userData: any = [];
    constructor(private router: Router, private fd: FetchDataService) { }

    ngOnInit(): void {
      this.sponsorData = JSON.parse(localStorage.getItem('sessionData'));

      this.sponsors.push(this.sponsorData.sponsors);
      // this.userData = JSON.parse(localStorage.getItem('user_id'));
      // console.log(this.userData);

      this.userId = localStorage.getItem('user_id');
      console.log(this.userId)
      // this.getSponsorData();
    }
  // getSponsorData(){


  // }
  goSponsorDetail(sponID){
    console.log(sponID);
    let token = localStorage.getItem('token');
     this.fd.generateSponosorLead(token,sponID,this.userId).subscribe((res: any) => {
     console.log(res);
   });
    this.router.navigate(['/sponsor/sponsor-detail'], {queryParams: {id:sponID}});
  }

}
