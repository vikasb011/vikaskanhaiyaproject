import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { FetchDataService } from '../../../../../../services/fetch-data.service';
import { LobbyService } from '../../../../../../services/lobby.service';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss']
})
export class AttendeesComponent implements OnInit, AfterViewInit {
  lobbyData = [];
  testData = [
    [ { "user_id_1": 5, "user_name_1": "divakar", "seat_no_1": 1 , "user_id_2": 6, "user_name_2": "Vasu Vasta", "seat_no_2": 2 } ],
  ];
  usernames = [];
  tableStatus = false;
  data = [];
  seatFirst = false;
  seatSecond = false;
  seatThird = false;
  seatFourth = false;
  seatStatus = false;
  tableNo: number;
  totalTables: any = [];
  tableObj = {};
  showTables = [];
  event_id;
  role_id;
  constructor(private _fd: FetchDataService, private lobbySocketService: LobbyService) { }

  ngOnInit(): void {
    this.getDashboardData();
    // this.onLoadData();
    this.event_id = JSON.parse(localStorage.getItem('logindata')).event_id;
    this.role_id = JSON.parse(localStorage.getItem('logindata')).role_id;
    let tableNumbers = [];
    let tableData = [];
    this.lobbySocketService.checkLobbyEmit(this.event_id);
    this.lobbySocketService.getLobby().subscribe((data) => {
      let socketLobbyData = JSON.parse(data);
      // console.log('result',  socketLobbyData.result);
        this.showTables = [];
        tableData = socketLobbyData.result.lobby;
        for (let t = 0; t < socketLobbyData.result.tables; t++) {
          let tab = 'table_'+(t+1);
          tableNumbers.push(tab);
          Object.assign(this.tableObj, {[tab]: [{user_name: ''}, {user_name: ''}, {user_name: ''}, {user_name: ''}]});
          let showObj = [{
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
          this.showTables.push(showObj)
        }
        for (let i = 0; i < socketLobbyData.result.tables; i++) {
          let num = 'table_'+(i+1);
          for (var key in tableData) {
            for (let ind = 0; ind < 4; ind++) {
              if(num === key) {
                if (tableData[key][ind] !== undefined){
                  // console.log('user_id_'+(ind+1), tableData[key][ind].user_id);
                  // let user_id = 'user_id_'+(ind+1);
                  // let user_name = 'user_name_'+(ind+1);
                  // let seat_no = 'seat_no_'+(ind+1);
                  if((tableData[key][ind].seat_no === 1) && tableData[key][ind].user_name && tableData[key][ind].seat_no) {
                    this.showTables[i][0]['user_id_1'] = tableData[key][ind].user_id;
                    this.showTables[i][0]['user_name_1'] = tableData[key][ind].user_name;
                    this.showTables[i][0]['seat_no_1'] = tableData[key][ind].seat_no;
                  }
                  if((tableData[key][ind].seat_no === 2) && tableData[key][ind].user_name && tableData[key][ind].seat_no) {
                    this.showTables[i][0]['user_id_2'] = tableData[key][ind].user_id;
                    this.showTables[i][0]['user_name_2'] = tableData[key][ind].user_name;
                    this.showTables[i][0]['seat_no_2'] = tableData[key][ind].seat_no;
                  }
                  if((tableData[key][ind].seat_no === 3) && tableData[key][ind].user_name && tableData[key][ind].seat_no) {
                    this.showTables[i][0]['user_id_3'] = tableData[key][ind].user_id;
                    this.showTables[i][0]['user_name_3'] = tableData[key][ind].user_name;
                    this.showTables[i][0]['seat_no_3'] = tableData[key][ind].seat_no;
                  }
                  if((tableData[key][ind].seat_no === 4) && tableData[key][ind].user_name && tableData[key][ind].seat_no) {
                    this.showTables[i][0]['user_id_4'] = tableData[key][ind].user_id;
                    this.showTables[i][0]['user_name_4'] = tableData[key][ind].user_name;
                    this.showTables[i][0]['seat_no_4'] = tableData[key][ind].seat_no;
                  }

                }
              }
            }

          }
        }
    });
    // this._fd.getLobbyData(this.event_id).subscribe((res: any) => {
    //   this.showTables = [];
    //   tableData = res.result.lobby;
    //   for (let t = 0; t < res.result.tables; t++) {
    //     let tab = 'table_'+(t+1);
    //     tableNumbers.push(tab);
    //     Object.assign(this.tableObj, {[tab]: [{user_name: ''}, {user_name: ''}, {user_name: ''}, {user_name: ''}]});
    //     let showObj = [{
    //       'user_id_1': null,
    //       'user_name_1': null,
    //       'seat_no_1': null,
    //       'user_id_2': null,
    //       'user_name_2': null,
    //       'seat_no_2': null,
    //       'user_id_3': null,
    //       'user_name_3': null,
    //       'seat_no_3': null,
    //       'user_id_4': null,
    //       'user_name_4': null,
    //       'seat_no_4': null,
    //     }];
    //     this.showTables.push(showObj)
    //   }
    //   for (let i = 0; i < res.result.tables; i++) {
    //     let num = 'table_'+(i+1);
    //     for (var key in tableData) {
    //       for (let ind = 0; ind < 4; ind++) {
    //         if(num === key) {
    //           if (tableData[key][ind] !== undefined){
    //             // console.log('user_id_'+(ind+1), tableData[key][ind].user_id);
    //             // let user_id = 'user_id_'+(ind+1);
    //             // let user_name = 'user_name_'+(ind+1);
    //             // let seat_no = 'seat_no_'+(ind+1);
    //             if((tableData[key][ind].seat_no === 1) && tableData[key][ind].user_name && tableData[key][ind].seat_no) {
    //               this.showTables[i][0]['user_id_1'] = tableData[key][ind].user_id;
    //               this.showTables[i][0]['user_name_1'] = tableData[key][ind].user_name;
    //               this.showTables[i][0]['seat_no_1'] = tableData[key][ind].seat_no;
    //             }
    //             if((tableData[key][ind].seat_no === 2) && tableData[key][ind].user_name && tableData[key][ind].seat_no) {
    //               this.showTables[i][0]['user_id_2'] = tableData[key][ind].user_id;
    //               this.showTables[i][0]['user_name_2'] = tableData[key][ind].user_name;
    //               this.showTables[i][0]['seat_no_2'] = tableData[key][ind].seat_no;
    //             }
    //             if((tableData[key][ind].seat_no === 3) && tableData[key][ind].user_name && tableData[key][ind].seat_no) {
    //               this.showTables[i][0]['user_id_3'] = tableData[key][ind].user_id;
    //               this.showTables[i][0]['user_name_3'] = tableData[key][ind].user_name;
    //               this.showTables[i][0]['seat_no_3'] = tableData[key][ind].seat_no;
    //             }
    //             if((tableData[key][ind].seat_no === 4) && tableData[key][ind].user_name && tableData[key][ind].seat_no) {
    //               this.showTables[i][0]['user_id_4'] = tableData[key][ind].user_id;
    //               this.showTables[i][0]['user_name_4'] = tableData[key][ind].user_name;
    //               this.showTables[i][0]['seat_no_4'] = tableData[key][ind].seat_no;
    //             }

    //           }
    //         }
    //       }

    //     }
    //   }
    //   // if (this.tableObj['table_1']) {
    //   //   console.log('dddd', this.tableObj['table_1'], tableData['table_1'])
    //   // }

    // });
  }
  getDashboardData() {
    const token = localStorage.getItem('token');
    localStorage.removeItem('sessionData');
    this._fd.getDashboardData(token).subscribe((res: any) => {
      localStorage.setItem('sessionData', JSON.stringify(res.result));
      localStorage.setItem('loadData', JSON.stringify(res.result));
    });
  }
  onLoadData() {
    this.lobbyData = [
      [ { "user_id_1": 5, "user_name_1": "divakar", "seat_no_1": 1 , "user_id_2": 6, "user_name_2": "Vasu Vasta", "seat_no_2": 2 } ],
      [ { "user_id_1": 5, "user_name_1": "hari", "seat_no_1": 1 , "user_id_2": 6, "user_name_2": "Vasu Vasta", "seat_no_2": 2,
    "user_id_3": 7, "user_name_3": "Vasu Vasta", "seat_no_3": 3
    } ] ];
    let id = this.event_id;
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
            this.usernames[k][0].user_id_1 = this.data[k][l].user_id;
            this.usernames[k][0].user_name_1 = this.data[k][l].user_name;
            this.usernames[k][0].seat_no_1 = this.data[k][l].seat_no;
          }
          if (this.data[k][l].seat_no===2 && this.data[k][l].user_id && this.data[k][l].user_name){
            this.usernames[k][0].user_id_2 = this.data[k][l].user_id;
            this.usernames[k][0].user_name_2 = this.data[k][l].user_name;
            this.usernames[k][0].seat_no_2 = this.data[k][l].seat_no;
          }
          if (this.data[k][l].seat_no===3 && this.data[k][l].user_id && this.data[k][l].user_name){
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
    this.tableNo = table_no + 1;
    this.seatStatus = true;
    this.seatFirst = true;
    this.seatSecond = false;
    this.seatThird = false;
    this.seatFourth = false;
    const formData = new FormData();
    const user_id = localStorage.getItem('user_id');
    formData.append('table_no', table_no + 1);
    formData.append('seat_no', seat_no);
    formData.append('user_id', user_id);
    this._fd.postBookTable(this.event_id,formData).subscribe((res: any) => {
      this.ngOnInit();
    });
  }
  getSecondSeat(table_no, seat_no){
    this.tableNo = table_no + 1;
    this.seatStatus = true;
    this.seatFirst = false;
    this.seatSecond = true;
    this.seatThird = false;
    this.seatFourth = false;
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
    this.tableNo = table_no + 1;
    this.seatStatus = true;
    this.seatFirst = false;
    this.seatSecond = false;
    this.seatThird = true;
    this.seatFourth = false;
    const formData = new FormData();
    const user_id = localStorage.getItem('user_id');
    formData.append('table_no', table_no + 1);
    formData.append('seat_no', seat_no);
    formData.append('user_id', user_id);
    this._fd.postBookTable(this.event_id,formData).subscribe((res: any) => {
      this.ngOnInit();
    });
  }
  getFourthSeat(table_no, seat_no){
    this.tableNo = table_no + 1;
    this.seatStatus = true;
    this.seatFirst = false;
    this.seatSecond = false;
    this.seatThird = false;
    this.seatFourth = true;
    const formData = new FormData();
    const user_id = localStorage.getItem('user_id');
    formData.append('table_no', table_no + 1);
    formData.append('seat_no', seat_no);
    formData.append('user_id', user_id);
    this._fd.postBookTable(this.event_id,formData).subscribe((res: any) => {
      this.ngOnInit();
    })
  }
  ngAfterViewInit() {
  //   setInterval(() => {
  //     this.onLoadData();
  //  }, 10000);
  }
}
