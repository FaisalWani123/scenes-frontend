import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {


  private apiUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/demo`);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/your-endpoint`, data);
  }


}
