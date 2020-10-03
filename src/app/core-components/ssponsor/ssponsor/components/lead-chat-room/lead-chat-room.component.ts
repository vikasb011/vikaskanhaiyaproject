import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../../../services/message.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-lead-chat-room',
  templateUrl: './lead-chat-room.component.html',
  styleUrls: ['./lead-chat-room.component.scss']
})
export class LeadChatRoomComponent implements OnInit {

  message: any = {};
  subscription: Subscription;  
  
  constructor(private service: MessageService, private route: ActivatedRoute) { 
    // this.subscription = this.messageService.getMessage().subscribe(message => { 
    //   this.message = message;  
    //   // this.channel = message;   
    //   console.log('testing', this.message);
    // });
  }

  ngOnInit(): void {
    this.sendRoom_id();
  }
  sendRoom_id(){
    this.route.queryParams.subscribe((params: Params)=>{
      console.log('rooo', params)
      let room_id = params.room_id;
      this.service.sendMessage(room_id);   

    });

  }
}
