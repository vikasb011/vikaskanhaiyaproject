import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiConstants } from './apiconfig/apiconstants';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  baseUrl = environment.url;
  baseUrl2 = environment.url2;
  dashboard = ApiConstants.dashboard;
  login = ApiConstants.login;
  leadGenerateSponsor = ApiConstants.sponosorLeadGenerate;
  lobby = ApiConstants.lobby;
  bookLobbyTable = ApiConstants.bookTableBook;
  menuItems = ApiConstants.getMenuItems;
  getLeadsSponsor = ApiConstants.sponsorGetLeads;
  getSponosrData = ApiConstants.getSponsorData;
  requestForChat = ApiConstants.postRequestChat;
  chatRequests = ApiConstants.getChatRequests;
  requestChatApproved = ApiConstants.aprovechatRequests;
  postaudeinceChat = ApiConstants.audienceChat;
  logOut = ApiConstants.logout;

  constructor(private http: HttpClient) { }

  getDashboardData(token): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.dashboard}/${token}`);
  }
  getLogin(token, email, password, roleID): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.login}/token/${token}/email/${email}/password/${password}/role_id/${roleID}`);
  }
  logoutData(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let params = new HttpParams();
    params = params.set('user_id', id);
    return this.http.post (`${this.baseUrl}/${this.logOut}`, params);
  }
  generateSponosorLead(token, sponId, userId): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let params = new HttpParams();
    params = params.set('event_token', token);
    params = params.set('sponsor_id', sponId);
    params = params.set('user_id', userId);
    return this.http.post(`${this.baseUrl}/${this.leadGenerateSponsor}`, params);
  }

  getLoggedinUsersList(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ApiConstants.loggedinUser}/${id}`);
  }
  getSearchLoggedinUsersList(id, key): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ApiConstants.searchLoggedinUsers}/${id}/name/${key}`)
  }
  getLobbyData(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.lobby}/${id}`);
  }

  postBookTable(id, table: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/${this.bookLobbyTable}/${id}`, table);
  }

  leaveSeatLobby(user_id):Observable<any> {
    return this.http.post(`${this.baseUrl}/${ApiConstants.leaveSeatLobby}/${user_id}`, user_id);
  }

  getMenus(roleId): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.menuItems}/role_id/${roleId}`)
  }
  getSponsorlead(token,sponId): Observable<any> {

    return this.http.get(`${this.baseUrl}/${this.getLeadsSponsor}/${token}/sponsor_id/${sponId}`);
  }
  sponosrDetail(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.getSponosrData}/${id}`)
  }
  addRequestChat(eventId, sponsorId, userId): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let params = new HttpParams();
    params = params.set('event_id', eventId);
    params = params.set('sponsor_id', sponsorId);
    params = params.set('user_id', userId);
    return this.http.post(`${this.baseUrl}/${this.requestForChat}`, params);
  }
  listChatRequests(eventId, sponId): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.chatRequests}/${eventId}/sponsor_id/${sponId}`);
  }
  requestApproved(status, eventid, sponId, user_id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    let params = new HttpParams();
    params = params.set('status', status);
    params = params.set('event_id', eventid);
    params = params.set('sponsor_id', sponId);
    params = params.set('user_id', user_id);
    return this.http.post(`${this.baseUrl}/${this.requestChatApproved}`, params);
  }
  registerSession(session: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${ApiConstants.registerSession}`, session);
  }
  getSessionParticipants(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ApiConstants.sessionsParticipants}/${id}`);
  }
  getSearchSessionParticipants(id, key:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ApiConstants.searchSessionsParticipants}/${id}/name/${key}`);
  }

  getModeratorChat(session_id): Observable<any> {
    return this.http.get(`${this.baseUrl2}/${ApiConstants.moderatorChat}/${session_id}/false`);
  }
  approvModeratorChat(id, data): Observable<any> {
    return this.http.patch(`${this.baseUrl2}/${ApiConstants.approvChat}/${id}`, data);
  }
  getAudienceAndSponsorChat(session_id): Observable<any> {
    return this.http.get(`${this.baseUrl2}/${ApiConstants.audienceAndSponsorChat}/${session_id}/true`);
  }
  pushPolllist(session_token,id): Observable<any> {
    return this.http.get(`https://belive.multitvsolution.com:8030/pollstart?token=${session_token}&poll_id=${id}`)
  }
  stopPolllist(session_token,id): Observable<any> {
    return this.http.get(`https://belive.multitvsolution.com:8030/pollstop?token=${session_token}&poll_id=${id}&mess=meet`);
  }
  showPolllist(session_token,id): Observable<any> {
    return this.http.get(`https://belive.multitvsolution.com:8030/pollresult?token=${session_token}&poll_id=${id}&mess=meet`);
  }
  getPollModderator(token,userid): Observable<any>{
    return this.http.get(`https://belive.multitvsolution.com/beliveapi/index.php/v2/get/poll_list?token=${token}&user_id=${userid}`);
  }
  postAudienceChat(chat:any): Observable<any> {
    return this.http.post(`${this.baseUrl2}/${this.postaudeinceChat}`, chat);
  }
  // raise hand to speak with speaker
  raiseHandRequestToModerator(request:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${ApiConstants.raiseHandRequest}`, request);
  }
  // getRaiseHand request in moderator
  getRaiseHandPendingList(id):Observable<any> {
    return this.http.get(`${this.baseUrl}/${ApiConstants.raiseHandPendingList}/${id}`);
  }
  // approve call
  approveAudienceCall(call:any):Observable<any> {
    return this.http.post(`${this.baseUrl}/${ApiConstants.approveCall}`, call);
  }
  getPendingTweets(session_id): Observable<any>{
    return this.http.get(`${this.baseUrl}/${ApiConstants.twitterChat}/${session_id}/status/0`);
  }
  getApprovedTweets(session_id): Observable<any>{
    return this.http.get(`${this.baseUrl}/${ApiConstants.twitterChat}/${session_id}/status/1`);
  }
  postApproveTweets(tweet:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${ApiConstants.approveTweets}`, tweet);
  }
  getPolls(token, user_id, poll_id):Observable<any> {
    return this.http.get(`${ApiConstants.pollList}?token=${token}&user_id=${user_id}&poll_id=${poll_id}`);
  }

  requestSponsorVideoChat(vchat: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${ApiConstants.requsetScheduleDemo}`, vchat);
  }
  fetchScheduleDemoList(event_id, sponsor_id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ApiConstants.scheduleDemoList}/event_id/${event_id}/sponsor_id/${sponsor_id}`);
  }
  approvScheduleDemo(demo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${ApiConstants.approveSchedule}`, demo);
  }
  getChatRooms(event_id, user_id, sponsor_id): Observable<any>{
    return this.http.get(`${this.baseUrl}/${ApiConstants.chatRooms}/event_id/${event_id}/user_id/${user_id}/sponsor_id/${sponsor_id}`);
  }

}
