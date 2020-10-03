import { Component, OnInit } from '@angular/core';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MessageService } from '../../../../services/message.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  private localStream: Stream;
  private client: AgoraClient;

  /**
   * App ID used when connecting to the Agora.io servers
   */
  appId: FormControl = new FormControl((environment as any).agora ? (environment as any).agora.appId : '');
  /**
   * Channel (meeting room) within the Agora app to join
   */
  channel = new FormControl(localStorage.getItem('room_id'));
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

  constructor(private agoraService: NgxAgoraService, private service:MessageService, private route: ActivatedRoute) {

  }

  
  ngOnInit() {
    this.sendRoom_id();
  }
  sendRoom_id(){
    this.route.queryParams.subscribe((params: Params)=>{
      let room_id = params.room_id;
      this.service.sendMessage(room_id);   

    });

  }
}
