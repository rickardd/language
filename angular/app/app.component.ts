import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router, CanActivate} from 'angular2/router';

import {LoginComponent} from './login/login.component';
import {LoggedInGuard} from './login/logged-in.guard';
import {GameComponent} from './game/game.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ProfileComponent} from './profile/profile.component';
import {PrivateListComponent} from './lists/private.component';
import {GlobalListComponent} from './lists/global.component';

@RouteConfig([
               { path: "/game", name: "Game", component: GameComponent},
               // { path: "/profile", name: "Profile", component: ProfileComponent, CanActivate: [LoggedInGuard]},
               { path: "/profile", name: "Profile", component: ProfileComponent },
               { path: "/lists/private", name: "PrivateList", component: PrivateListComponent},
               { path: "/lists/global", name: "GlobalList", component: GlobalListComponent},
               { path: '*others', name: 'Other', redirectTo: ['Profile']}
             ])

@Component({
    selector: 'my-app',
    template: `
      <navigation></navigation>
      <router-outlet></router-outlet>
      <login></login>
    `,
    directives: [
      ROUTER_DIRECTIVES,
      NavigationComponent,
      ProfileComponent,
      GameComponent,
      PrivateListComponent,
      GlobalListComponent,
      // LoginComponent
    ]
})
export class AppComponent {

  // doLogin = false;
  // public path : string = '';

  // ngOnInit(){
  //   this.doLogin = true
  // }

}

