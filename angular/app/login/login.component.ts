import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

import { UserService } from '../user/user.service';

@Component({
  selector: 'login',
  template: `...`
})
export class LoginComponent {

  // @Input() doLogin : boolean;

  constructor(private userService: UserService, private router: Router) {
    this.loginIn( "user1@mail.com", "pass")
  }

  // ngOnChanges(){
  //   console.log("login start");
  // }

  loginIn(email, password) {
    this.userService.login(email, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['']);
      }
    });
  }
}