import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../_models/user';
import {Policy} from '../_models/policy';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  currentUser: User;
  constructor() { }
  editedPolicy: Policy;
  @ViewChild('modal')modal: ModalComponent;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  policyEdited(event) {

    this.editedPolicy = event;
    this.modal.show();
  }
}
