import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Friend} from '../../Entities/friend/friend';
import {map} from 'rxjs/operators';
import {FindAllPackagesResponse} from '../../Entities/package/packageResponse/find-all-packages-response';

@Injectable({
  providedIn: 'root'
})
export class PackageServicesService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getPackagesForEstablishment(id: number | undefined): Observable<FindAllPackagesResponse> {
    return this.http.get<FindAllPackagesResponse>(`${this.apiUrl}/package/controller/findAll/${id}`);

  }
}
