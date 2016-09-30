import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router, CanActivate} from 'angular2/router';

import {LoginComponent} from './login/login.component';
import {LoggedInGuard} from './login/logged-in.guard';
import {GameComponent} from './game/game.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ProfileComponent} from './profile/profile.component';
import {MyListComponent} from './lists/my_list.component';
import {PlayListComponent} from './lists/play_list.component';
import {CommonListComponent} from './lists/common_list.component';
import {VerbListComponent} from './lists/verb_list.component';

@RouteConfig([
               { path: "/game", name: "Game", component: GameComponent},
               // { path: "/profile", name: "Profile", component: ProfileComponent, CanActivate: [LoggedInGuard]},
               { path: "/profile", name: "Profile", component: ProfileComponent },
               { path: "/lists/mylist", name: "MyList", component: MyListComponent},
               { path: "/lists/playlist", name: "PlayList", component: PlayListComponent},
               { path: "/lists/commonlist", name: "CommonList", component: CommonListComponent},
               { path: "/lists/verblist", name: "VerbList", component: VerbListComponent},
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
      MyListComponent,
      PlayListComponent,
      CommonListComponent
      VerbListComponent
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

