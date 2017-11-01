import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class PolicyService {

  private policyURL = environment.policyURL;
  constructor() { }

}
