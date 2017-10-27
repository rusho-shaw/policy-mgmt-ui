import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../_service/user.service';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: any = {};
  sub: any;
  userName: string;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy'
  };

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }
  /*ngOnDestroy(): void {
    this.sub.unsubscribe();
  }*/
  saveUserDetails() {
    /*alert(`saved!!! ${JSON.stringify(this.user)}`);*/
    this.userService.save(this.user)
      .subscribe(r => this.userName = r.userName);
  }
}
