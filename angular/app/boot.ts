import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http'

import { UserService } from './user/user.service';
import { LoggedInGuard } from './login/logged-in.guard';

bootstrap(AppComponent,
       [
          UserService,
          LoggedInGuard,
          ROUTER_PROVIDERS,
          HTTP_PROVIDERS
        ]);