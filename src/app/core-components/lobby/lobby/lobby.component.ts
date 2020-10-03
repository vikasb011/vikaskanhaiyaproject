import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../../../layout/shared/menu/menu.items';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
menuItems = MenuItems;
lobbyMenuItems = [];
  constructor() { }

  ngOnInit(): void {
    for(let i=0; i < this.menuItems.length; i++){
      if(this.menuItems[i].path =="lobby"){
        // if (this.menuItems[i].children){
        //   this.lobbyMenuItems = this.menuItems[i].children;
        //}
      }
    }
  }

}
