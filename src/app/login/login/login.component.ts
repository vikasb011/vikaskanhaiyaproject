import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
msg;
urlmsg;
 Role = [
    {value: '1', name: 'Audience'},
    {value: '2', name: 'Speaker'},
    {value: '3', name: 'Sponsor'},
    {value: '4', name: 'Moderator'},
];
token;
  constructor(private router: Router, private route: ActivatedRoute, private fd: FetchDataService) { }

  loginForm = new FormGroup({
    roleId: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });
  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    // console.log(this.token);
    //this.router.navigate(['/login'], {queryParams: {token: this.token}});
  }

  login() {

    const loginEmail = this.loginForm.value.email;
    const loginPass = this.loginForm.value.password;
    const RoleId = this.loginForm.value.roleId;
    const token = this.route.snapshot.queryParamMap.get('token');
    if(token == '' || token == undefined){
      this.urlmsg = 'Please check url again';
    }
    console.log("baba", token);


    if(loginEmail === '' || loginPass == '' || RoleId ==''){
      this.msg = 'Please enter all fields';
    }
    this.fd.getLogin(token, loginEmail, loginPass, RoleId).subscribe((res: any) => {
      if ( res.code === 1 && res.result.length != 0) {
            localStorage.setItem('user_id', res.result.id);
            localStorage.setItem('logindata', JSON.stringify(res.result));
            // console.log(localStorage.getItem('user_id'));
            localStorage.setItem('token',token);
            // console.log('loginoke', localStorage.getItem('token'));
            localStorage.setItem('role_id',RoleId);
            this.fd.getMenus(RoleId).subscribe((menu:any)=>{
              localStorage.setItem('menu-items', JSON.stringify(menu.result[0].menu));
              this.router.navigate(['/dashboard']);
            })
            }
            if (res.code === 0 || res.result.length === 0){
            this.msg = 'Invalid Login';
            }
    });
  }
}
