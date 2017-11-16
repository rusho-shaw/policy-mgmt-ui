import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PolicyService} from '../_service/policy.service';
import {User} from '../_models/user';
import {Policy} from '../_models/policy';
import {LoadingComponent} from '../loading/loading.component';

@Component({
  selector: 'app-all-policies',
  templateUrl: './all-policies.component.html',
  styleUrls: ['./all-policies.component.scss']
})
export class AllPoliciesComponent implements OnInit {
  loggedInUser: User;
  policies: Policy[];
  loadingPolicies: boolean;
  editedPolicy: Policy;
  @ViewChild('appLoading')appLoading: LoadingComponent;
  @Output()
  policyEdited: EventEmitter<Policy> = new EventEmitter<Policy>();
  constructor(private policyService: PolicyService) { }

  ngOnInit() {
    this.loadingPolicies = true;
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllPolicies();
  }

  getAllPolicies() {
    this.policyService.getAllPolicies()
      .subscribe(r => {
        this.policies = r;
        this.loadingPolicies = false;
      });
  }
  editPolicy(policy: Policy) {
    console.log('in edit policy: ' + policy.policyName);
    policy.isBeingEdited = true;
    console.log('in editing...: ' + policy.policyName);
  }
  savePolicy(policy: Policy) {
    console.log('in save policy: ' + policy.policyName);
    console.log('in editing...: ' + policy.policyDetails);
    this.appLoading.show();
    this.policyService.savePolicy(policy)
      .subscribe(r => {
        policy.policyUpdateMsg = r;
        policy.isBeingEdited = false;
        this.appLoading.hide();
        this.policyEdited.emit(policy);
      });
  }
}
