import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http, Response, Headers} from '@angular/http';
import { URLSearchParams } from '@angular/http';
import {Policy} from '../_models/policy';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

@Injectable()
export class PolicyService {

  private policyURL = environment.policyURL;
  constructor(private http: Http, private httpClient: HttpClient) { }

  getPolicyName(policyId: string): Observable<string> {
    // console.log(JSON.stringify({ policyId: policyId}));
    let urlSearchParams = new HttpParams();
    urlSearchParams = urlSearchParams.set('policyId', policyId);
    /*const policy  = <any>({
      policyId: policyId
    });*/
    return this.httpClient.get(`${this.policyURL}/getPolicy` , {params: urlSearchParams})
      .map(mapPolicyFromResponse);
  }
  getAllPolicies(): Observable<Policy[]> {
    console.log('In get all policies');
    /*return this.http.get(`${this.policyURL}/getAllPolicies`)
      .map(mapPoliciesFromResponse);*/

    return this.httpClient.get(`${this.policyURL}/getAllPolicies`)
      .map(mapPoliciesFromResponse);


  }
  savePolicy(policy: Policy) {
    let urlSearchParams = new HttpParams();
    urlSearchParams = urlSearchParams.set('policyNumber', policy.policyNumber);
    urlSearchParams = urlSearchParams.set('policyName', policy.policyName);
    urlSearchParams = urlSearchParams.set('policyDetails', policy.policyDetails);
    return this.httpClient.get(`${this.policyURL}/addOrUpdate`, {params: urlSearchParams})
      .map(mapSavePolicyResponse);
  }
}

function mapPolicyFromResponse(response: Response): string {
  return toPolicyName(response);
}
function toPolicyName(r: any): string {
  return r.status === '1' ? r.policy.policyName : null;
}
function mapPoliciesFromResponse(response: HttpResponse<any>): Policy[] {
  return toPolicies(response);
}
function toPolicies(r: any): Policy[] {
  return r.status === '1' ? r.policies : null;
}
function mapSavePolicyResponse(response: Response): string {
  return toSaveMessage(response);
}
function toSaveMessage(r: any): string {
  return r.status === '1' ? r.message : 'Error updating policy.';
}
