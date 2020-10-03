import { Component, OnInit, OnDestroy } from "@angular/core";
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
import { $ } from "protractor";

@Component({
  selector: "app-chatting-room",
  templateUrl: "./chatting-room.component.html",
  styleUrls: ["./chatting-room.component.scss"],
})
export class ChattingRoomComponent implements OnInit, OnDestroy {
  private localStream: Stream;
  private client: AgoraClient;
  volume = "microphone";
  video = "video";
  videoBoolean = false;
  volumeBoolean = false;
  message: any = {};
  subscription: Subscription;
  videoStatus = false;
  /**
   * App ID used when connecting to the Agora.io servers
   */
  appId: FormControl = new FormControl(
    (environment as any).agora ? (environment as any).agora.appId : ""
  );
  /**
   * Channel (meeting room) within the Agora app to join
   */
  // channel = new FormControl(localStorage.getItem('room_id'));
  // channel = new FormControl('123');
  channel = new FormControl();
  channelName(key) {
    this.channel = key;
  }
  /**
   * Generated user ID that is attached to the local client when joining a meeting room
   */
  uid: number;

  /**
   * All the IDs of other users that have joined the call
   */
  remoteCalls: string[] = [];
  /**
   * Whether the local client has tuned in to the Agora meeting room
   */
  connected = false;
  /**
   * Whether the local client's A/V stream has been published to the remote meeting room
   */
  published = false;

  constructor(
    private agoraService: NgxAgoraService,
    private messageService: MessageService
  ) {
    this.subscription = this.messageService
      .getMessage()
      .subscribe((message) => {
        this.message = message;
        localStorage.setItem("roomId", this.message.text);
        this.channel = new FormControl(this.message.text);
      });
    this.uid = Math.floor(Math.random() * 100);

    this.client = this.agoraService.createClient({
      mode: "rtc",
      codec: "h264",
    });
    this.assignClientHandlers();
  }

  ngOnInit() {
    this.client.init(
      this.appId.value,
      () => {
        console.log("Initialized successfully");
        this.join();
      },
      () => console.log("Could not initialize")
    );
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
    this.client.unpublish(this.localStream, (error) => console.error(error));
    this.published = false;
  }

  myLocal = "local";
  leave(): void {
    if (this.connected) {
      this.client.leave(
        () => {
          console.log("Left the channel successfully");
          this.unpublish();
          this.localStream.stop();

          this.localStream.close();
          // $("#agoralocal").empty();
          this.connected = false;
          this.published = false;
          this.remoteCalls = [];
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

    this.client.on(ClientEvent.RemoteStreamSubscribed, (evt) => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
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
          (call) => call !== `${this.getRemoteId(stream)}`
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
      this.localStream.unmuteAudio();
    }
  }
  toggleVideo() {
    this.videoBoolean = !this.videoBoolean;
    if (this.videoBoolean) {
     // this.client.unpublish(this.localStream, (error) => console.error(error));
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

  ngOnDestroy() {
    this.leave();
    alert('leave');
    console.log('destroyed')
  }
}
