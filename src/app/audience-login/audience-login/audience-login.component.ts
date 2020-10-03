import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchDataService } from 'src/app/services/fetch-data.service';
@Component({
  selector: 'app-audience-login',
  templateUrl: './audience-login.component.html',
  styleUrls: ['./audience-login.component.scss']
})
export class AudienceLoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  token;
  msg;
  coverImage;
  constructor(private fd: FetchDataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    // console.log(this.token);
    this.fd.getDashboardData(this.token).subscribe((res: any)=>{
      console.log('result dash', res.result.cover_picture);
      this.coverImage = res.result.cover_picture;
    });
  }

  login() {
    const loginEmail = this.loginForm.value.email;
    const loginPass = this.loginForm.value.password;
    const RoleId = '1';
    const token = this.route.snapshot.queryParamMap.get('token');
    // console.log('baba', token);
    if (loginEmail === '' || loginPass == '') {
      this.msg = 'Please enter all fields';
    }
    this.fd.getLogin(token, loginEmail, loginPass, RoleId).subscribe((res: any) => {
      // console.log(res.result);
      if ( res.code === 1 && res.result.length != 0) {
             localStorage.setItem('user_id', res.result.id);
             localStorage.setItem('logindata', JSON.stringify(res.result));
             console.log(localStorage.getItem('user_id'));
             localStorage.setItem('token', token);
             console.log('loginoke', localStorage.getItem('token'));
             localStorage.setItem('role_id', RoleId);
             console.log(localStorage.getItem('role_id'));
             this.fd.getMenus(RoleId).subscribe((menu:any)=>{
              localStorage.setItem('menu-items', JSON.stringify(menu.result[0].menu));
              this.router.navigate(['/dashboard']);
            })
            }
      if (res.code === 0 || res.result.length === 0) {
            this.msg = 'Invalid Login';
            }
    });
  }
}
