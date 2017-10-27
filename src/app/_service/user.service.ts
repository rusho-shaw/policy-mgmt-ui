import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService {

  // private userURL = 'http://localhost:9080/user';
  private userURL = environment.userURL;
  constructor(private http: Http) { }

  save(user: User): Observable<User> {
    // save user from here
    // alert(`saved!!! ${JSON.stringify(user)}`);
    // user.confirmPassword = null;
    return this
      .http
      .put(`${this.userURL}/save`, JSON.stringify(user), {headers: this.getHeaders()})
      .map(mapUserFromResponse);
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    return headers;
  }
}

function mapUserFromResponse(response: Response): User {
  return toUser(response.json());
}
function toUser(r: any): User {
  const respUser = r.user;
  const user = <User> ({
    userName: respUser.userName
  });
  console.log('User: ', user);
  return user;
}
