import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestService } from './request/request.service';
import { BaseSettings } from '../config/app.settings';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl;  // URL to web api
  constructor(private requestsService: RequestService,
              private router: Router,
              private settings: BaseSettings,
              private storageService: StorageService) {

  }


  getAll(): any[] {
    return this.getUsers();
  }

  getById(id): any {
    const filtered = this.getUsers().filter(user => user.id === id);
    const user = filtered.length ? filtered[0] : null;
    return user;
  }

  getByUsername(username): any {
    const filtered = this.getUsers().filter(user => user.username === username);
    const user = filtered.length ? filtered[0] : null;

    return user;
  }

  create(user): any {
    const duplicateUser = this.getByUsername(user.username);

    if (duplicateUser !== null) {
        return ({ success: false, message: 'Username "' + user.username + '" is already taken' });
    } else {
        const users = this.getUsers();

        // assign id
        const lastUser = users[users.length - 1] || { id: 0 };
        user.id = lastUser.id + 1;

        // save to local storage
        users.push(user);
        console.log(users);

        this.setUsers(users);

        return ({ success: true });
    }
}

  update(user): void {
      const users = this.getUsers();
      for (let i = 0; i < users.length; i++) {
          if (users[i].id === user.id) {
              users[i] = user;
              break;
          }
      }
      this.setUsers(users);
  }

  delete(id): void {

      const users = this.getUsers();
      for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if (user.id === id) {
              users.splice(i, 1);
              break;
          }
      }
      this.setUsers(users);
  }

  saveUserToSession(username: string) {
    this.storageService.addTemp('loggeduser', {username});
  }

  checkUserSession() {
    this.storageService.getTemp('loggeduser');
  }

  getUsers(): any[] {
    const users = this.storageService.get('users');

    if(!users){
      this.storageService.add('users', []);
    }
    return this.storageService.get('users');
  }

  setUsers(users): void {
    this.storageService.add('users', users);
  }

}
