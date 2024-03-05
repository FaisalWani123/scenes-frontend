import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Entities/user';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {


  private apiUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/demo`);
  }

  // @ts-ignore
  registerUser(user?: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  login(user?: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/authenticate`, user);
  }

  // tslint:disable-next-line:typedef
  doesUserExist(email?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/controller/findByEmail/${email}`);
  }

  // registerUser(data: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const options = { headers };
  //
  //   return this.http.post(`${this.apiUrl}/auth/register`, JSON.stringify(data), options);
  // }


}
