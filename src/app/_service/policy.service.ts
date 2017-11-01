import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http, Response, Headers} from '@angular/http';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class PolicyService {

  private policyURL = environment.policyURL;
  constructor(private http: Http) { }

  getPolicyName(policyId: string): Observable<string> {
    console.log(JSON.stringify({ policyId: policyId}));
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('policyId', policyId);
    return this.http.post(`${this.policyURL}/getPolicy` , urlSearchParams)
      .map(mapPolicyFromResponse);
  }
}

function mapPolicyFromResponse(response: Response): string {
  return toPolicyName(response.json());
}
function toPolicyName(r: any): string {
  return r.status === '1' ? r.policy.policyName : null;
}
