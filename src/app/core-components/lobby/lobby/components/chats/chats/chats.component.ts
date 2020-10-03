import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../../../../../../services/fetch-data.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  lobbyData = [];
  testData = [ 
    [ { "user_id_1": 5, "user_name_1": "divakar", "seat_no_1": 1 , "user_id_2": 6, "user_name_2": "Vasu Vasta", "seat_no_2": 2 } ], 
 ];
 usernames = [];
 data = [];
 event_id;
  constructor(private _fd: FetchDataService) { }

  ngOnInit(): void {
    this.lobbyData = [ 
      [ { "user_id_1": 5, "user_name_1": "divakar", "seat_no_1": 1 , "user_id_2": 6, "user_name_2": "Vasu Vasta", "seat_no_2": 2 } ], 
      [ { "user_id_1": 5, "user_name_1": "hari", "seat_no_1": 1 , "user_id_2": 6, "user_name_2": "Vasu Vasta", "seat_no_2": 2,
    "user_id_3": 7, "user_name_3": "Vasu Vasta", "seat_no_3": 3
    } ] ];
    let id = 20;
    this.event_id = JSON.parse(localStorage.getItem('logindata')).event_id;
    this._fd.getLobbyData(id).subscribe((res: any) => {
      let tables: any = [];
      let objKeys = [];
      this.data = [];
      this.usernames = [];
      objKeys = Object.keys(res.result.lobby);
      this.data = Object.values(res.result.lobby);
      for (let i = 0; i < res.result.tables; i++) {
        let table ='table_'+(i+1);
        tables.push(table);  
      }
      for (let i = 0; i < tables.length; i++) {
        let table ='table_'+(i+1);
        if (!objKeys.includes(table)) {
          // console.log(table)
      // insert string 'someString' into the array at index 2
        this.data.splice( i, 0, [] );
        }
             
      }
      
      this.data.forEach(element => {
        if (element.length === 0) {
          element.push({ user_name: '' }, { user_name: '' }, { user_name: '' }, { user_name: '' });
        }
        if (element.length === 1) {
          element.push({ user_name: '' }, { user_name: '' }, { user_name: '' });
        }
        if (element.length === 2) {
          element.push({ user_name: '' }, { user_name: '' });
        }
        if (element.length === 3) {
          let obj = { user_name: '' };
          element.push(obj);
        }
      });
      console.log('table', this.data)
      for (let i = 0; i < res.result.tables; i++) {
        let table ='table_'+(i+1);
        let obj = [{
          'user_id_1': null,
          'user_name_1': null,
          'seat_no_1': null,
          'user_id_2': null,
          'user_name_2': null,
          'seat_no_2': null,
          'user_id_3': null,
          'user_name_3': null,
          'seat_no_3': null,
          'user_id_4': null,
          'user_name_4': null,
          'seat_no_4': null,
        }];
        this.usernames.push(obj);  
      }     
      for (let k = 0; k < this.data.length; k++) {
        for (let l = 0; l < this.data[k].length; l++) {
          const element = this.data[k][l];
          if (this.data[k][l].seat_no===1 && this.data[k][l].user_id && this.data[k][l].user_name){
            console.log('ele', this.usernames[k])
            this.usernames[k][0].user_id_1 = this.data[k][l].user_id;
            this.usernames[k][0].user_name_1 = this.data[k][l].user_name;
            this.usernames[k][0].seat_no_1 = this.data[k][l].seat_no;
          }
          if (this.data[k][l].seat_no===2 && this.data[k][l].user_id && this.data[k][l].user_name){
            console.log('two', k, l)
            this.usernames[k][0].user_id_2 = this.data[k][l].user_id;
            this.usernames[k][0].user_name_2 = this.data[k][l].user_name;
            this.usernames[k][0].seat_no_2 = this.data[k][l].seat_no;
          }
          if (this.data[k][l].seat_no===3 && this.data[k][l].user_id && this.data[k][l].user_name){
            console.log('three', k, l)
            this.usernames[k][0].user_id_3 = this.data[k][l].user_id;
            this.usernames[k][0].user_name_3 = this.data[k][l].user_name;
            this.usernames[k][0].seat_no_3 = this.data[k][l].seat_no;
          }
          if (this.data[k][l].seat_no===4 && this.data[k][l].user_id && this.data[k][l].user_name){
            this.usernames[k][0].user_id_4 = this.data[k][l].user_id;
            this.usernames[k][0].user_name_4 = this.data[k][l].user_name;
            this.usernames[k][0].seat_no_4 = this.data[k][l].seat_no;
          }
        }
      }
    });
  }
  getFirstSeat(table_no, seat_no){
    const formData = new FormData();
    const user_id = localStorage.getItem('user_id');
    formData.append('table_no', table_no + 1);
    formData.append('seat_no', seat_no);
    formData.append('user_id', user_id);
    this._fd.postBookTable(this.event_id, formData).subscribe((res: any) => {
      this.ngOnInit();
    });
  }
  getSecondSeat(table_no, seat_no){
    const formData = new FormData();
    const user_id = localStorage.getItem('user_id');
    formData.append('table_no', table_no + 1);
    formData.append('seat_no', seat_no);
    formData.append('user_id', user_id);
    this._fd.postBookTable(this.event_id, formData).subscribe((res: any) => {
      this.ngOnInit();
    });
  }
  getThirdSeat(table_no, seat_no){
    const formData = new FormData();
    const user_id = localStorage.getItem('user_id');
    formData.append('table_no', table_no + 1);
    formData.append('seat_no', seat_no);
    formData.append('user_id', user_id);
    this._fd.postBookTable(this.event_id, formData).subscribe((res: any) => {
      this.ngOnInit();
    });
  }
  getFourthSeat(table_no, seat_no){
    const formData = new FormData();
    const user_id = localStorage.getItem('user_id');
    formData.append('table_no', table_no + 1);
    formData.append('seat_no', seat_no);
    formData.append('user_id', user_id);
    this._fd.postBookTable(this.event_id, formData).subscribe((res: any) => {
      this.ngOnInit();
    })
  }
}
