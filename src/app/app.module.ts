import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AllPoliciesComponent } from './all-policies/all-policies.component';
import { UserPoliciesComponent } from './user-policies/user-policies.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {ConnectionBackend, Http, HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {MyDatePickerModule} from 'mydatepicker';
import { MatchValidatorDirective } from './_validators/match-validator.directive';
import {AuthGuard} from './_guards/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { UserPolicyChildComponent } from './user-policy-child/user-policy-child.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './_interceptors/token.interceptor';
import {AuthService} from './_service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AllPoliciesComponent,
    UserPoliciesComponent,
    MatchValidatorDirective,
    LandingComponent,
    UserPolicyChildComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MyDatePickerModule
  ],
  providers: [AuthGuard, AuthService, {
    provide: TokenInterceptor,
    useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions, AuthService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpFactory(backend: XHRBackend, options: RequestOptions, auth: AuthService) {
  return new TokenInterceptor(backend, options, auth);
}
