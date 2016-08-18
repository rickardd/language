import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {GameComponent} from './game/game.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ProfileComponent} from './profile/profile.component';

@RouteConfig([
               { path: "/game", name: "Game", component: GameComponent},
               { path: "/profile", name: "Profile", component: ProfileComponent},
               { path: '*others', name: 'Other', redirectTo: ['Profile']}
             ])

@Component({
    selector: 'my-app',
    template: `
      <navigation></navigation>
      <router-outlet></router-outlet>
    `,
    directives: [
      ROUTER_DIRECTIVES,
      GameComponent,
      NavigationComponent,
    ]
})
export class AppComponent { }