import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NgxAgoraService,
  Stream,
  AgoraClient,
  ClientEvent,
  StreamEvent,
} from "ngx-agora";
import { FormControl } from "@angular/forms";
import { environment } from "src/environments/environment";
import { MessageService } from "../../../../services/message.service";
import { Subscription } from "rxjs";
import * as _ from 'underscore';
import * as AgoraRTM from 'agora-rtm-sdk';
import { FetchDataService } from '../../../../services/fetch-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-session-room',
  templateUrl: './session-room.component.html',
  styleUrls: ['./session-room.component.scss']
})
export class SessionRoomComponent implements OnInit, OnDestroy {
  private localStream: Stream;
  private client: AgoraClient;
  private screenClient: AgoraClient;

  private RTMclient:any = AgoraRTM.createInstance((environment as any).agora ? (environment as any).agora.appId : "");

  banner;
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
  requestStatus;
  approvedAudience = [];
  videoPlayer;
  approvedStatus = false;
  disableEnableVolume = false;
  disableEnableVideo = false;
  status;
  url;
  /**
   * App ID used when connecting to the Agora.io servers
   */
  appId: FormControl = new FormControl((environment as any).agora ? (environment as any).agora.appId : "");

  channel = new FormControl();
  uid: number;
  remoteCalls: any = [];
  /**
   * Whether the local client has tuned in to the Agora meeting room
   */
  connected = false;
  /**
   * Whether the local client's A/V stream has been published to the remote meeting room
   */
  published = false;

  constructor(private agoraService: NgxAgoraService, private messageService: MessageService, private _fd: FetchDataService, private route: ActivatedRoute) {
    this.role_id = JSON.parse(localStorage.getItem('role_id'));
    this.uid = Math.floor(Math.random() * 100);

    this.client = this.agoraService.createClient({mode: "rtc", codec: "h264",});
    this.screenClient = this.agoraService.createClient({mode: "rtc", codec: "h264",});
    this.assignClientHandlers();
  }

  ngOnInit() {
    this.url = window.location.href;
    console.log(this.url,'baba');
    if(this.role_id === 1){
      this.route.params.subscribe((params:Params)=>{
        this.status = params.status;
      });
    } else {
      this.route.queryParams.subscribe((params:Params)=>{
        this.status = params.status;
      })
    }
    this.getRaiseHandList();

    this.user_id  = JSON.parse(localStorage.getItem('user_id'));
    this.uid = this.user_id;
    this.banner = localStorage.getItem('banner');
    this.videoPlayer = localStorage.getItem('video-player');
    // this.speaker_id  = JSON.parse(localStorage.getItem('speaker_id'));
    this.session_token = localStorage.getItem('session_token');
    let session_speakers:any = JSON.parse(localStorage.getItem('session-speakers'));
    this.channel = new FormControl(this.session_token);
    // find if user exits in array
    const userExists = session_speakers.some(user => user.id === this.user_id);
    // console.log('session_speakers', userExists);
    if(!userExists){
      this.speaker_id = null;
      this.session_speakers = session_speakers.filter((item:any)=>item.id !== this.user_id);
    }
    if(userExists){
      this.speaker_id = this.user_id;
      this.session_speakers = session_speakers.filter((item:any)=>item.id !== this.user_id);
    }

  }


  startCall() {
    this.videoBoolean = false;
    this.volumeBoolean = false;
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
      this.localStream = this.agoraService.createStream({
        streamID: this.uid,
        audio: true,
        video: true,
        screen: false,
      });
      this.assignLocalStreamHandlers();
      this.init();
      const rtmUid = 'mod' + this.user_id;
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
    this.client.publish(this.localStream, (err) =>
      console.log("Publish local stream error: " + err)
    );
  }

  unpublish(): void {
    this.videoStatus = false;
    this.client.unpublish(this.localStream, (error) => console.error('unpublish the call- ', this.localStream));
    this.published = false;
  }

  leave(): void {
    if (this.connected) {
      this.client.leave(
        () => {
          console.log("Left the channel successfully");
          this.unpublish();
          this.videoBoolean = false;
          this.volumeBoolean = false;
          this.disableEnableVideo = false;
          this.disableEnableVolume = false;
          this.volume = 'microphone';
          this.video = 'video';
          this.connection = false;
          // this.client.unpublish(this.localStream, (error) => console.error('unpublish the call- ', this.localStream));
          this.localStream.stop();
          this.localStream.close();
          this.connected = false;
          // this.published = false;
          this.remoteCalls = [];
          this.showVideo = false;
          if (this.role_id === 1){
            // this.raiseHandrequestToModeratorCall();
            const formData: any =  new FormData();
            this.route.params.subscribe((params: Params)=> {
              formData.append('session_id', params.session_id);
              formData.append('user_id', params.user_id);
              formData.append('status', 'deleted');
              this._fd.approveAudienceCall(formData).subscribe(approve => {
                this.getRaiseHandList();
              });
            });

          }
          this.RTMclient.logout();

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
          if(this.role_id===1){
            this.disableEnableVolume = !this.disableEnableVolume;
          }
          this.toggleVolume();
          break;
        case 'v':
          console.log('quick toggle the video');
          if(this.role_id===1){
            this.disableEnableVideo = !this.disableEnableVideo;
          }
          this.toggleVideo();
          break;
        case 'q':
          console.log('so sad to see you quit the channel');
          this.volume = 'microphone';
          this.video = 'video';
          this.callConnect = 'phone';
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
          this.approvedAudience.forEach(data => {
            if(this.remoteCalls[i].id === 'agora_remote-'+data.user_id){
              this.remoteCalls[i].name = 'Audience: '+data.name;
            }
          });
        }
        console.log('ladfaf', this.approvedAudience)
        this.remoteCalls.forEach(element => {
          console.log('remote', element)
          this.session_speakers.forEach(spk => {
            if (element === 'agora_remote-'+spk.id){
              this.remoteName = spk.name;
            }
          });
        });
        let result = this.remoteCalls.reduce((unique, o) => {
          if(!unique.some(obj => obj.id === o.id && obj.name === o.name)) {
            unique.push(o);
          }
          return unique;
        },[]);
        this.remoteCalls = result;
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
    console.log('volumeboolean', this.volumeBoolean)
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
// SCREEN SHARING
  localStreams: any = {
    camera: {
      id: '',
      stream: {},
    },
    screen: {
      id: '',
      stream: {},
    },
  };
  screenStream: any;
 initScreenShare() {
   this.screenClient.init(this.appId.value, () => {
     console.log("AgoraRTC screenClient Initialized successfully");
      // this.joinChannelAsScreenShare();
      }, () => console.log("[ERROR] : AgoraRTC screenClient init failed")
    );
  }

  // joinChannelAsScreenShare(){
  //   let token = null;
  //   let userID = null;
  //   this.screenClient.join(null, this.channel.value, this.uid, ()=> {
  //     this.localStreams.screen.id = this.uid;
  //     this.screenStream = this.agoraService.AgoraRTC.createStream({
  //       streamID: this.uid,
  //       audio: false, // Set the audio attribute as false to avoid any echo during the call.
  //       video: false,
  //       screen: true, // screen stream
  //       extensionId: 'minllpmhdgpndnkomcoccfekfegnlikg', // Google Chrome:
  //       mediaSource: 'screen', // Firefox: 'screen', 'application', 'window' (select one)
  //     });
  //     this.screenStream.setScreenProfile('480p_2');
  //     this.screenStream.init(()=> {
  //         console.log('getScreen successful');
  //         this.localStreams.screen.stream = this.screenStream; // keep track of the screen stream
  //         this.screenClient.publish(this.screenStream, (err)=> {
  //           console.log('[ERROR] : publish screen stream error: ' + err);
  //         });
  //       }, (err)=>{
  //         console.log('[ERROR] : getScreen failed', err);
  //         this.localStreams.screen.id = ''; // reset screen stream id
  //         this.localStreams.screen.stream = {}; // reset the screen stream
  //       }
  //     );
  //   }, (err)=> {
  //     console.log('[ERROR] : join channel as screen-share failed', err);
  //   });
  //   this.screenClient.on(ClientEvent.LocalStreamPublished, (evt)=> {
  //     console.log('Publish screen stream successfully');
  //   });

  //   // this.screenClient.on('stopScreenSharing', function (evt) {
  //   //   console.log('screen sharing stopped', err);
  //   // });
  // }
  toggleShareScreen(){
     this.initScreenShare();
  }

  // audience to request moderator
  raiseHandrequestToModeratorCall(){
    const loginData:any = JSON.parse(localStorage.getItem('logindata'));
    const formData = new FormData();
    this.route.params.subscribe((params: Params)=> {
      formData.append('session_id', params.session_id);
      formData.append('user_id', params.user_id);
      formData.append('name', loginData.name);
      formData.append('mobile', loginData.phone);
      this._fd.raiseHandRequestToModerator(formData).subscribe(res => {
        console.log('raise', res);
        this.getRaiseHandList();
      });
    });
  }

  getRaiseHandList(){
    if(this.role_id === 1) {
      this.route.params.subscribe((params: Params)=> {
        setInterval(() => {
          this._fd.getRaiseHandPendingList(params.session_id).subscribe((res:any) => {
            this.approvedAudience = res.result;
            const userExists = res.result.some(user => user.user_id === this.user_id);
            if(userExists){
              res.result.forEach(element => {
                if(element.user_id === this.user_id){
                  this.requestStatus = element.status;
                }});
            }
            if(!userExists){
              this.requestStatus = 'none';
            }

            // res.result.forEach(element => {
            //   if(element.user_id === this.user_id){
            //     this.requestStatus = element.status;
            //   }
            //   else {
            //     this.requestStatus = 'none';
            //   }
            // });
            if (this.approvedAudience.length === 0){
              this.requestStatus = 'none';
            }
          });
          if(this.requestStatus==='approved'){
            clearInterval();
          }
        }, 10000);
      });
    }
    if (this.role_id === 2){
      this.route.queryParams.subscribe((params: Params)=> {
        this._fd.getRaiseHandPendingList(params.session_id).subscribe((res:any) => {
          this.approvedAudience = res.result;
        });
      });
    }
  }

  ngOnDestroy(){
    console.log('dosconnect');
    this.leave();
    //   let val = confirm("Do you want to exit this page ?");
    //   console.log('val',val);

    //   if(val === true ) {
    //     this.leave();
    //     return true;
    //     console.log('leave call')
    //  }
    //  else{
    //    return false;
    //    console.log('leave false')

    //  }

  }
}
