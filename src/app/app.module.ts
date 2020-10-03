import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig,LoginOpt } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import {SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { NgxAgoraModule } from 'ngx-agora';
import { MessageService } from './services/message.service';
import { DataService } from './services/data.service';
import { LobbyService } from './services/lobby.service';
import { DeactivateGuard } from './guards/deactivate.guard';
const data: SocketIoConfig ={ url : 'https://belive.multitvsolution.com:8030', options: {} };

const fbLoginOptions: LoginOpt = {
  scope: 'email,user_photos',
  return_scopes: true,
  enable_profile_selector: true
};
const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1041416291021-h43je7q1ljfilpq5kkunr970hq1nbjm6.apps.googleusercontent.com',googleLoginOptions)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('122231164888409',fbLoginOptions)
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(data),
    NgxAgoraModule.forRoot({ AppID: environment.agora.appId })
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    MessageService, DataService, LobbyService, DeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
