import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private socket:Socket) { 
    // super({ url: 'https://virtual.multitvsolution.com:7000', options: {} });

  }
  public checkLobbyEmit(event_id) {
    // let event_id = JSON.parse(localStorage.getItem('logindata')).event_id;
    this.socket.emit('lobbyList', event_id);  
  }
  public getLobby = () => {
    return Observable.create((observer) => {
      this.socket.on('getLobbyList', (data) => {
        observer.next(data);
        //console.log('sevrc',message);
      });
    });
  };
}
