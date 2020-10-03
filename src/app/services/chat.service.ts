import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( private socket: Socket) { }

  public sendMessage(message, usr, video_id) {
    //console.log('servicce',message);
    this.socket.emit('sendchat', message);
    this.socket.emit('notify_user',usr, video_id);
    console.log(usr, video_id);
  }

  public checkParticipant(id) {
    this.socket.emit('participant', id);
  }
  public checksessionParticipants(id) {
    this.socket.emit('sessionParticipant', id);
  }
  public checktwitters(id, status) {
    this.socket.emit('getTweets', id, status);
  }
  public checksessionchat(id, status) {
    this.socket.emit('getChatData', id, status);
  }
  public checkModeratorchat(id, status) {
    this.socket.emit('getModData', id, status);
  }
  public checksponsorvideos(eventid, sponsorId) {
    this.socket.emit('getSponsorDemoCall', eventid,sponsorId);
  }
  public checksponsorchat(eventid, sponsorId) {
    this.socket.emit('getSponsorChat', eventid,sponsorId);
  }
  public checksponsorlead(token, sponsorId) {
    this.socket.emit('getSponsorLead', token,sponsorId);
  }
  public checkModPolls(sessionid) {
    this.socket.emit('pollListing', sessionid);
  }
  public pushVote(objid,token,value,email,name) {
    let  data = {
      pollObjId: objid,
            choice: value,
            token: token,
            mess: 'meet',
            email_id: email,
            name: name
    };
    this.socket.emit('pushpollvote', data);
    console.log(data);
  }
  public checkPolllist(sessionid) {
    this.socket.emit('pushpoll', {
      token: sessionid,
      message: 'meet',
    });
    console.log('push',sessionid);
  }
  public getParticipant = () => {
    return Observable.create((observer) => {
      this.socket.on('participantlist', (data) => {
        observer.next(data);
        //console.log('sevrc',message);
      });
    });
  };
  public getTweetslist = () => {
    return Observable.create((observer) => {
      this.socket.on('tweetlist', (data) => {
        observer.next(data);
        //console.log('sevrc',message);
      });
    });
  };
  public getPollList = (token) => {

    return Observable.create((observer) => {
      this.socket.on(token, (data) => {
        observer.next(data);
      //  alert('hi');
        console.log('getPollList',data);
      });
    });
  };
  public getModPollList = () => {

    return Observable.create((observer) => {
      this.socket.on('getPollList', (data) => {
        observer.next(data);
      });
    });
  };
  public getChatlist = () => {
    return Observable.create((observer) => {
      this.socket.on('getChatDataList', (data) => {
        observer.next(data);
        //console.log('sevrc',message);
      });
    });
  };
  public getModChatlist = () => {
    return Observable.create((observer) => {
      this.socket.on('getModDataList', (data) => {
        observer.next(data);
        //console.log('sevrc',message);
      });
    });
  };
  public getSessionParticipant = () => {
    return Observable.create((observer) => {
      this.socket.on('sessionParticipantlist', (data) => {
        observer.next(data);
        //console.log('sevrc',message);
      });
    });
  };

  public videoRequestList = () => {
    return Observable.create((observer) => {
      this.socket.on('sponsorDemoList', (data) => {
        observer.next(data);
        //console.log('sevrc',message);
      });
    });
  };
  public sponsorChatList = () => {
    return Observable.create((observer) => {
      this.socket.on('sponsorChatList', (data) => {
        observer.next(data);
        //console.log('sevrc',message);
      });
    });
  };
  public sponsorleadList = () => {
    return Observable.create((observer) => {
      this.socket.on('sponsorLeadList', (data) => {
        observer.next(data);
        //console.log('sevrc',message);
      });
    });
  };

  public addUser(usr, video_id) {
    console.log("add");
    let avatar_id = 1;
    this.socket.emit('adduser', {
      username: usr,
      avatarId: avatar_id,
      video_id: video_id,
      video_name: 'Event Chat',
    });
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('updatechat', (username, avatarId, data) => {
        let mesageObject = [data, username];

        if (username === 'SERVER') {
          console.log(
            username + '========' + avatarId + '==============' + data
          );
          //observer.next(mesageObject);
        } else if (localStorage.getItem('username') == username) {
          console.log(
            username + '========' + avatarId + '==============' + data
          );
          observer.next(mesageObject);
        } else {
          console.log(
            username + '========' + avatarId + '==============' + data
          );
          observer.next(mesageObject);
        }
        // observer.next(mesageObject);
        //console.log('sevrc',message);
      });
    });
  };

}
