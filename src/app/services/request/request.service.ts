import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  get(url, data?: any): Observable<any[]> {
    if (data) {
      return this.http.get<any[]>(url,  { params: new HttpParams({ fromObject: data }) } );
    } else {
      return this.http.get<any[]>(url);
    }
  }
}
