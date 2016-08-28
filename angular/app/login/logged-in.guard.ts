import { Injectable } from 'angular2/core';
import { Router, CanActivate } from 'angular2/router';
import { UserService } from '../user/user.service';

@Injectable()

// export class LoggedInGuard implements CanActivate {
export class LoggedInGuard {
  constructor(private user: UserService) {}

  canActivate() {
    return this.user.isLoggedIn();
  }
}