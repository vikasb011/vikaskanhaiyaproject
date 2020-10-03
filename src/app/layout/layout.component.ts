import { Component, OnInit, HostListener } from '@angular/core';
//import { MenuItems } from './shared/menu/menu.items';
import { FetchDataService } from '../services/fetch-data.service';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menuItems: any = [];
  isExpanded = false;
  show = 'hide';
  innerWidth: any;
  roleData :any = [];
  roleID ;
  user_id;
  event_id;
  token;
  role_id;
  constructor(private _fd: FetchDataService, private router: Router, private chatService : ChatService) { }

  ngOnInit(): void {
    this.role_id = localStorage.getItem('role_id');
    this.token = localStorage.getItem('token');
    this.roleData = JSON.parse(localStorage.getItem('logindata'));
    this.user_id = JSON.parse(localStorage.getItem('user_id'));
    // this.roleID = this.roleData.role_id;
    this.getSessionData();
    this.menuItemsGet();
    this.getOnloadData();
    this.innerWidth = window.innerWidth;
    document.getElementById("mySidenav").style.width = "175px";
    document.getElementById("main").style.marginLeft = "175px";
    this.isExpanded = true;
    this.show = 'show';
    if (this.innerWidth <= 767) {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }
  }

  openClose() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      document.getElementById("mySidenav").style.width = "175px";
      document.getElementById("main").style.marginLeft = "175px";
      setTimeout(() => {
        this.show = 'show';
      }, 500);
      if (this.innerWidth <= 767) {
        document.getElementById("mySidenav").style.width = "175px";
        document.getElementById("main").style.marginLeft = "0";
      }
    } else {
      this.show = 'hide';
      document.getElementById("mySidenav").style.width = "60px";
      document.getElementById("main").style.marginLeft = "60px";
      if (this.innerWidth <= 767) {
        document.getElementById("mySidenav").style.width = "0px";
        document.getElementById("main").style.marginLeft = "0";
      }
    }
  }

  closeNav() {
    this.show = 'hide';
    this.isExpanded = false;
    document.getElementById("mySidenav").style.width = "60px";
    document.getElementById("main").style.marginLeft = "60px";
    if (this.innerWidth <=767) {
      document.getElementById("mySidenav").style.width = "0px";
      document.getElementById("main").style.marginLeft = "0px";
    }
  }

  @HostListener('window:resize', ['$event'])
	onResize(event) {
    this.innerWidth = event.target.innerWidth;
    // console.log(this.innerWidth)
    if (event.target.innerWidth <= 767) {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    } else {
      this.show = 'hide';
      document.getElementById("mySidenav").style.width = "60px";
      document.getElementById("main").style.marginLeft = "60px";
    }
  }


  getOnloadData() {
    let token = localStorage.getItem('token');
    localStorage.removeItem('loadData');
    this._fd.getDashboardData(token).subscribe((res: any) => {
      localStorage.setItem('loadData', JSON.stringify(res.result));
    })
  }

  menuItemsGet() {
    this.roleID = localStorage.getItem('role_id');
    this.menuItems = JSON.parse(localStorage.getItem('menu-items'))
    // this._fd.getMenus(this.roleID).subscribe((res:any)=>{

    //   this.menuItems = res.result[0].menu;
    // })
  }

  logOut() {
    this.user_id = JSON.stringify(this.user_id)
    this._fd.leaveSeatLobby(this.user_id).subscribe(res => {
      // console.log('deleted', res)
    });
    this._fd.logoutData(this.user_id).subscribe(res => {
      console.log('logout', res);
    });
    let logToken = localStorage.getItem('token');
    localStorage.clear();
    // console.log('role',this.role_id);
    // console.log('toke',logToken);
    if(this.role_id == '1'){
      console.log('audeincelogin');
      this.router.navigate(['/audienceLogin'], {queryParams:{token: logToken}});
    }
    else{
      console.log('otherlogin');
      this.router.navigate(['/login'], {queryParams:{token: logToken}});
    }
  }
  loginuserlist() {
    this.event_id = JSON.parse(localStorage.getItem('logindata')).event_id;
    this.chatService.checkParticipant(this.event_id);
    console.log('participants');
  }

  getSessionData() {
    const token = localStorage.getItem('token');
    // localStorage.removeItem('sessionData');
    this._fd.getDashboardData(token).subscribe((res: any) => {
      localStorage.setItem('sessionData', JSON.stringify(res.result));
      localStorage.setItem('loadData', JSON.stringify(res.result));
      // console.log('ggg', res.result)     
    });
  }
}
