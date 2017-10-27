import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';

const routes: Routes = [
  // map '/persons to people list component
  {
    path: 'home',
    component: LoginComponent
  },
  // route for person details component
  /*{
    path: 'persons/:id',
    component: PersonDetailsComponent
  },*/
  {
    path: 'register',
    component: RegistrationComponent
  },
  // map '/' to '/persons'as our default route
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
// export const appRouterModule = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
