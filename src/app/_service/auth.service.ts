import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http, Response, Headers} from '@angular/http';
import { URLSearchParams } from '@angular/http';
import {User} from '../_models/user';

@Injectable()
export class AuthService {
  // tokenURL = environment.tokenURL;

  constructor(private http: Http) { }
  public getToken(): string {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    return user.token.access_token;
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  /*getTokenFromWso2(): Observable<string> {
    // console.log(JSON.stringify({ policyId: policyId}));
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'client_credentials');
    return this.http.post(`https://cors-anywhere.herokuapp.com/${this.tokenURL}` , urlSearchParams, {headers: this.getHeaders()})
      .map(mapTokenFromResponse);
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Authorization', environment.keys);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }*/
}
function mapTokenFromResponse(response: Response): string {
  return toToken(response.json());
}
function toToken(r: any): string {
  return r.access_token;
}
