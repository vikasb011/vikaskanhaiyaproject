import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../../../layout/shared/menu/menu.items';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements OnInit {
  menuItems = MenuItems;
  conferenceMenuItems = [];
  constructor() { }

  ngOnInit(): void {
    console.log(window.navigator)
    for(let i = 0; i < this.menuItems.length; i++) {
      if(this.menuItems[i].path === "conference") {
        // if (this.menuItems[i].children) {
        //   this.conferenceMenuItems = this.menuItems[i].children;
        // }
      }
    }
  }

}
