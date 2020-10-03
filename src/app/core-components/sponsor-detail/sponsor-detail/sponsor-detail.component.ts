import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FetchDataService } from "src/app/services/fetch-data.service";

@Component({
  selector: "app-sponsor-detail",
  templateUrl: "./sponsor-detail.component.html",
  styleUrls: ["./sponsor-detail.component.scss"],
})
export class SponsorDetailComponent implements OnInit {
  public sponsorId;
  playerSource;
  sponsorDetail: any = [];
  sponsors: any = [];
  thumbVideos = [];
  imgUrl = "./assets/images/first_slide1.jpg";
  msg;
  isShow = false;
  durationInSeconds = 5;
  constructor(private route: ActivatedRoute, private fd: FetchDataService) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.sponsorId = id;
    this.getSponsorDetailData();
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
      alert("This video is already playing");
    } else {
      this.playerSource = thumb.video;
    }
  }

  chatRequest(sponID) {
    let spon_id = sponID;
    let user_id = localStorage.getItem("user_id");
    let event = JSON.parse(localStorage.getItem("sessionData"));
    let eventId = event.id;
    this.fd.addRequestChat(eventId, spon_id, user_id).subscribe((res: any) => {
      if (res.result == "success!!") {
        this.msg = "Your request is sent";
        this.isShow = true;
        // this._snackBar.open(msg);
      }
    });
  }
}
