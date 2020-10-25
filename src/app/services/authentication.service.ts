import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './users.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authChange: Subject<any> = new Subject<any>();

  constructor(private userService: UserService, private storageService: StorageService) {
  }

  public async isAuthenticated() {
    return this.storageService.getTemp('loggeduser') !== null;
  }

  Login(username, password): any {
    let response;
    const user = this.userService.getByUsername(username);


    if (user !== null && user.password === password) {
        this.userService.saveUserToSession(username);
        response = { success: true };
    } else {
        response = { success: false, message: 'Username or password is incorrect' };
    }
    return response;
  }

  Logout(): void {
    if ( confirm('Seguro que quieres salir de la sesión?') ) {
      this.storageService.remove('loggeduser');
    }
  }
}
