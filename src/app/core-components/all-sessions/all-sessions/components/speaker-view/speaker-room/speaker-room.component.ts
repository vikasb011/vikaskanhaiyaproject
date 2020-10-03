import { Component, OnInit } from '@angular/core';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';

@Component({
  selector: 'app-speaker-room',
  templateUrl: './speaker-room.component.html',
  styleUrls: ['./speaker-room.component.scss']
})
export class SpeakerRoomComponent implements OnInit {
  user_id;
  speaker_id;
  session_token;
  localCallId = 'agora_local';
  remoteCalls: string[] = [];
  volume = "microphone";
  video = "video";
  videoBoolean = false;
  volumeBoolean = false;
  showBanner = false;

  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;
  constructor(private ngxAgoraService: NgxAgoraService) {
    this.uid = Math.floor(Math.random() * 100);
    console.log('uid', this.uid)
   }

  ngOnInit(): void {
    this.user_id  = JSON.parse(localStorage.getItem('user_id'));
    // this.uid = this.user_id;
    this.speaker_id  = JSON.parse(localStorage.getItem('speaker_id'));    
    this.session_token = localStorage.getItem('session_token');
    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();

    // initialize localstream
    this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();
    // this.initLocalStream();
    // this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
  }
  
  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (id) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }
  leaveCall(){
    this.localStream.stop();
    this.showBanner = true;
    // this.client.unpublish(this.localStream, err => console.log('unPublish local stream error: ' + err));          
    this.client.leave(() => {let stream : Stream; let abc:any = `agora_remote-${stream.getId()}`; this.client.unpublish(abc)})
  }
  startCall(){
    // this.localStream.play(this.localCallId);
    // this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
    this.initLocalStream();
    this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
  }
  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
  this.localStream.init(
    () => {
       // The user has granted access to the camera and mic.
       this.localStream.play(this.localCallId);
       if (onSuccess) {
         onSuccess();
       }
    },
    err => console.error('getUserMedia failed', err)
  );
  } 

  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(null, this.session_token, this.uid, onSuccess, onFailure);
  }
  
  /**
   * Attempts to upload the created local A/V stream to a joined chat room.
   */
  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }
  toggleVolume() {
    this.volumeBoolean = !this.volumeBoolean;
    if (this.volumeBoolean) {
      this.volume = "microphone-slash";
      this.localStream.muteAudio();
    } else {
      this.volume = "microphone";
      this.localStream.enableAudio();
    }
  }
  toggleVideo() {
    this.videoBoolean = !this.videoBoolean;
    if (this.videoBoolean) {
      this.client.unpublish(this.localStream, (error) => console.error(error));
      this.localStream.disableVideo();
      this.video = "video-slash";
    } else {
      this.client.publish(this.localStream, (err) =>
        console.log("Publish local stream error: " + err)
      );
      this.localStream.enableVideo();
      this.video = "video";
    }
  } 
}
