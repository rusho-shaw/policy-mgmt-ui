import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AllPoliciesComponent } from './all-policies/all-policies.component';
import { UserPoliciesComponent } from './user-policies/user-policies.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MyDatePickerModule} from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AllPoliciesComponent,
    UserPoliciesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    MyDatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
