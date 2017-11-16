import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../_service/user.service';
import {ModalComponent} from '../modal/modal.component';
import {LoadingComponent} from '../loading/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit  {

  user: any = {};
  returnUrl: string;
  loginError: string;
  role: string;
  loginExpired: boolean;
  @ViewChild('appLoading')appLoading: LoadingComponent;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // reset login status
    this.userService.logout();
    this.loginError = null;
    this.loginExpired = localStorage.getItem('expired') !== null;
    // return url default to '/'
    this.returnUrl = '/';
  }
  ngAfterViewInit() {
    console.log('in this.modal.nativeElement:' + this.appLoading);
  }
  login() {
    console.log('in login component login');
    this.appLoading.show();
    // localStorage.removeItem('expired');
    /*this.user.userName === 'Admin' ? this.validateAdmin() :*/
    this.userService.login(this.user.userName, this.user.password)
      .subscribe(r => {
        const user = r;
        console.log('User in login component here: ' + user);
        if (user && user.role) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.appLoading.hide();
          localStorage.removeItem('expired');
          this.router.navigate(['/landing']);
        } else {
          /*this.user.userName === 'Admin' ? this.loginError = 'Contact Admin Service' :
            this.loginError = 'You are a not registered User. Register to login';*/
          this.loginError = user.userError;
          this.user.password = null;
          this.appLoading.hide();
        }
      });
    // console.log('Roleqq: ' + this.role);
  }
  /*validateAdmin() {
    console.log('in Admin Validate');
    if (this.user.password !== 'Admin') {
      this.loginError = 'Contact Admin Service';
      this.user.password = null;
    }
  }*/

}
