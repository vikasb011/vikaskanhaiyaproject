import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent,} from "ngx-agora";
import { FormControl } from "@angular/forms";
import { environment } from "src/environments/environment";
import { MessageService } from "../../../../services/message.service";
import { Subscription } from "rxjs";
import * as _ from 'underscore';
import * as AgoraRTM from 'agora-rtm-sdk';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { FetchDataService } from '../../../../services/fetch-data.service';
@Component({
  selector: 'app-moderator-room',
  templateUrl: './moderator-room.component.html',
  styleUrls: ['./moderator-room.component.scss']
})
export class ModeratorRoomComponent implements OnInit, OnDestroy, OnChanges {
  private localStream: Stream;
  private client: AgoraClient;
  private RTMclient:any = AgoraRTM.createInstance((environment as any).agora ? (environment as any).agora.appId : "");

  banner;
  remoteId;
  playPause= 'play';
  playChannel = false;
  volume = "microphone";
  video = "video";
  videoBoolean = false;
  volumeBoolean = false;
  message: any = {};
  subscription: Subscription;
  videoStatus = false;
  user_id;
  role_id;
  speaker_id;
  session_token;
  showVideo=false;
  callConnect = 'phone';
  connection = false;
  session_speakers = [];
  remoteName;
  approvedAudienceList = [];
  location: Location;
  videoPlayer;
  status;
  /**
   * App ID used when connecting to the Agora.io servers
   */
  appId: FormControl = new FormControl((environment as any).agora ? (environment as any).agora.appId : "");
  
  channel = new FormControl();
  uid: number;
  remoteCalls: any = [];
  connected = false;  
  published = false;

  constructor(private agoraService: NgxAgoraService, private messageService: MessageService, private route: ActivatedRoute, private _fd: FetchDataService) {
    
    this.uid = Math.floor(Math.random() * 100);

    this.client = this.agoraService.createClient({
      mode: "rtc",
      codec: "h264",
    });
    this.assignClientHandlers();
  }
  ngOnInit(): void {
    this.role_id = JSON.parse(localStorage.getItem('role_id'));
    this.user_id  = JSON.parse(localStorage.getItem('user_id'));
    this.uid = this.user_id;
    this.banner = localStorage.getItem('banner');
    this.videoPlayer = localStorage.getItem('video-player');
    this.session_token = localStorage.getItem('session_token');
    this.session_speakers = JSON.parse(localStorage.getItem('session-speakers'));
    this.channel = new FormControl(this.session_token);
    this.route.queryParams.subscribe((params:Params)=>{
      this.status = params.status;
    });
    // initiate call
    // this.client.init(
    //   this.appId.value,
    //   () => {
    //     console.log("Initialized successfully");
    //     this.showVideo = true;
    //     this.join();
    //   },
    //   () => console.log("Could not initialize")
    // );
    // this.RTMclient.on('ConnectionStateChange', (newState, reason) => {
    //   console.log(
    //     'on connection state changed to ' + newState + ' reason: ' + reason
    //   );
    // });
  }
  toggleWatchCall() {
    this.connected = !this.connected;
    if (this.connected){
      this.playPause = 'pause';
      this.callConnect = 'phone-slash';

      this.client.init(
        this.appId.value,
        () => {
          console.log("Initialized successfully");
          this.showVideo = true;
          this.join();
        },
        () => console.log("Could not initialize")
      );
      this.RTMclient.on('ConnectionStateChange', (newState, reason) => {
        console.log(
          'on connection state changed to ' + newState + ' reason: ' + reason
        );
      });
    } else {
      this.leave();
      // this.playPause='play';
    }
  }

  toggleConnection() {
    this.connection = !this.connection;
    if(this.connection){
      this.callConnect = 'phone-slash';
      this.client.init(this.appId.value, () => { console.log("Initialized successfully");
        this.showVideo = true;
        this.join();
        }, () => console.log("Could not initialize")
      );
    } else {
      this.callConnect='phone';
      this.leave();
    }
  }
  
  join(): void {
    this.client.join(null, this.channel.value, this.uid, () => {
      // this.localStream = this.agoraService.createStream({
      //   streamID: this.uid,
      //   audio: true,
      //   video: true,
      //   screen: false,
      // });
      // this.assignLocalStreamHandlers();
      // this.init();
      const rtmUid = 'rtm' + this.user_id;
      this.RTMclient.login({token: null, uid: rtmUid})
        .then(() => {
          // subscribeClientEvents();
          console.log('AgoraRTM client login success');
        })
        .catch((err) => {
          console.log('AgoraRTM client login failure', err);
        });
    });
  }

  publish(): void {
    this.videoStatus = true;

    console.log("publish");
    this.client.publish(this.localStream, (err) =>
      console.log("Publish local stream error: " + err)
    );
  }

  unpublish(): void {
    this.videoStatus = false;
    this.client.unpublish(this.localStream, (error) => console.error('unpublish the call- ', this.localStream));
    this.published = false;
  }

  myLocal = "local";
  leave(): void {
    if (this.connected) {
      this.client.leave(
        () => {
          console.log("Left the channel successfully");
          this.unpublish();
          this.videoBoolean = false;
          this.volumeBoolean = false;
          this.connection = false;
          // this.client.unpublish(this.localStream, (error) => console.error('unpublish the call- ', this.localStream));
          this.localStream.stop();
          this.localStream.close();
          // $("#agoralocal").empty();
          this.connected = false;
          this.published = false;
          this.remoteCalls = [];
          this.showVideo = false;
          this.RTMclient.logout();
          this.playPause="play"
        },
        (err) => {
          console.log("Leave channel failed");
        }
      );
    } else {
      this.agoraService.AgoraRTC.Logger.warning(
        "Local client is not connected to channel."
      );
    }
    
  }
  
  protected init(): void {
    this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        console.log("getUserMedia successfully");
        this.localStream.play("agora_local");
        this.connected = true;
        this.publish();
      },
      (err) => console.log("getUserMedia failed", err)
    );
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log("accessAllowed");
    });
    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log("accessDenied");
    });
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, (evt) => {
      this.published = true;
      console.log("Publish local stream successfully");
    });

    this.client.on(ClientEvent.Error, (error) => {
      console.log("Got error msg:", error.reason);
      if (error.reason === "DYNAMIC_KEY_TIMEOUT") {
        this.client.renewChannelKey(
          "",
          () => console.log("Renewed the channel key successfully."),
          (renewError) =>
            console.error("Renew channel key failed: ", renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, (evt) => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, (err) => {
        console.log("Subscribe stream failed", err);
      });
    });
    this.RTMclient.on('MessageFromPeer', (message, peerId) => {
      console.log('message ' + message.text + ' peerId' + peerId);
      switch (message.text) {
        case 'm':
          console.log('squick toggle the mic');
          this.toggleVolume(); 
          break;
        case 'v':
          console.log('quick toggle the video');
          this.toggleVideo();
          break;
        case 'q':
          console.log('so sad to see you quit the channel');
          this.leave();
          break;
        default: // do nothing
      }
    });
    this.client.on(ClientEvent.RemoteStreamSubscribed, (evt) => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (id) {
        this.remoteCalls.push({id: id, name:''});
        for (let i = 0; i < this.remoteCalls.length; i++) {
          this.session_speakers.forEach(element => {
            if(this.remoteCalls[i].id === 'agora_remote-'+element.id){
              this.remoteCalls[i].name = element.name;
            }
          });
        }
        this.route.queryParams.subscribe((params: Params)=> {
          this._fd.getRaiseHandPendingList(params.session_id).subscribe((res:any) => {
            this.approvedAudienceList = res.result;
            for (let i = 0; i < this.remoteCalls.length; i++) {
              this.approvedAudienceList.forEach(element => {
                if(this.remoteCalls[i].id === 'agora_remote-'+element.user_id){
                  this.remoteCalls[i].name = 'Audience: '+element.name;
                }
              });
            }
            console.log('hello', this.approvedAudienceList)
          });
        });
        // removing duplicates 
        let result = this.remoteCalls.reduce((unique, o) => {
          if(!unique.some(obj => obj.id === o.id && obj.name === o.name)) {
            unique.push(o);
          }
          return unique;
        },[]);
        this.remoteCalls = result;
        // this.remoteCalls.sort((a, b)=>{ return a.id - b.id; } );

        // // delete all duplicates from the this.remoteCalls
        // for( var i=0; i<this.remoteCalls.length-1; i++ ) {
        //   if ( this.remoteCalls[i].id == this.remoteCalls[i+1].id ) {
        //     delete this.remoteCalls[i];
        //   }
        // }

        // // remove the "undefined entries"
        // this.remoteCalls = this.remoteCalls.filter((el)=>{ return (typeof el !== "undefined"); } );
        console.log('remotecalls', this.remoteCalls)        
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, (evt) => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, (evt) => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(
          (call:any) => call.id !== `${this.getRemoteId(stream)}`
        );
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  toggleVolume() {
    this.volumeBoolean = !this.volumeBoolean;
    if (this.volumeBoolean) {
      this.volume = "microphone-slash";
      this.localStream.muteAudio();
      
    } else {
      this.volume = "microphone";
      // this.localStream.enableAudio();
      this.localStream.unmuteAudio(); // enable the local mic

    }
  }
  toggleVideo() {
    this.videoBoolean = !this.videoBoolean;
    if (this.videoBoolean) {
      // this.client.unpublish(this.localStream, (error) => console.error(error));
      this.localStream.muteVideo();
      this.video = "video-slash";
    } else {
      // this.client.publish(this.localStream, (err) => console.log("Publish local stream error: " + err));
      this.localStream.unmuteVideo();
      this.video = "video";
    }
  }
  sendPeerMessage(text, peerId, index) {
    console.log(this.remoteCalls[index]);
    if(text === 'm'){
      this.remoteCalls[index].volumeBoolean = !this.remoteCalls[index].volumeBoolean;
    }
    if(text === 'v'){
      this.remoteCalls[index].videoBoolean = !this.remoteCalls[index].videoBoolean;
    }
    //peerId = 1234;
    this.remoteId = peerId;
    peerId = peerId.toString();
    peerId = 'mod'+peerId.substring(peerId.indexOf('-')+1).trim();
    console.log('sendPeerMessage', text, peerId);
    this.RTMclient.sendMessageToPeer({text}, peerId).then((response) => {
      // subscribeClientEvents();
      console.log('Message Delivered=======', response, peerId);
    })
    .catch((err) => {
      console.log('Message Fail', err);
    });
  }

  ngOnChanges():void{
    this.route.queryParams.subscribe((params: Params)=> {
      this._fd.getRaiseHandPendingList(params.session_id).subscribe((res:any) => {
        this.approvedAudienceList = res.result;
        console.log('hello', this.approvedAudienceList)
      });
    });
  }
  ngOnDestroy(){
    console.log('leave channel destroy');
  }
}
