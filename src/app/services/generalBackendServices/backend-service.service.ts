import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../Entities/user/user';
import {Establishment} from '../../Entities/establishment/establishment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {


  private apiUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }


  getAllEstablishments(): Observable<Establishment[]> {
    return this.http.get<any[]>(`${this.apiUrl}/establishment/controller/findAll`)
      .pipe(
        // Assuming the API response is an array of objects like the provided example
        map((data: any[]) => data.map(item => this.mapToEstablishment(item)))
      );
  }
  private mapToEstablishment(data: any): Establishment {
    return {
      id: data.id,
      name: data.name,
      rating: data.rating,
      area: data.area,
      avgCostForTwo: data.avgCostForTwo,
      cuisine: data.cuisine,
      imageUrl: data.imageUrl,
    };
  }

  private mapToUser(data: any): User {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      outstandingAmount: data.outstandingAmount,
      enabled: data.enabled,
      accountNonExpired: data.accountNonExpired,
      credentialsNonExpired: data.credentialsNonExpired,
      dob: data.dob,
      username: data.username,
      authorities: data.authorities,
      accountNonLocked: data.accountNonLocked,
      male: data.male
    };
  }


  getEstablishment(id?: number): Observable<Establishment> {
    return this.http.get(`${this.apiUrl}/establishment/controller/${id}`).pipe(
      map((data: any) => this.mapToEstablishment(data))
    );
  }


  // @ts-ignore
  registerUser(user?: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  login(user?: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/authenticate`, user);
  }

  // tslint:disable-next-line:typedef
  doesUserExist(email?: string): Observable<User> {
    return this.http.get(`${this.apiUrl}/user/controller/findByEmail/${email}`).pipe(
      map((data: any) => this.mapToUser(data))
    );
  }

  findUserByEmail(email?: string): Observable<User>{
    return this.http.get(`${this.apiUrl}/user/controller/findIdByEmail/${email}`).pipe(
      map((data: any) => this.mapToUser(data))
    );
  }

  findUserById(id?: number): Observable<User>{
    return this.http.get(`${this.apiUrl}/user/controller/findById/${id}`).pipe(
      map((data: any) => this.mapToUser(data))
    );
  }

  getAllUsers(): Observable<User>{
    return this.http.get(`${this.apiUrl}/user/controller/findAll`).pipe(
      map((data: any) => this.mapToUser(data))
    );
  }

}
