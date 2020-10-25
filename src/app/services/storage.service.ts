import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  add(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  addTemp(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getTemp(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
