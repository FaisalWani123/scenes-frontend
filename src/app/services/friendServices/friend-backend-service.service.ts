import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Friend} from '../../Entities/friend/friend';
import {Establishment} from '../../Entities/establishment/establishment';
import {FriendListResponse} from '../../Entities/friend/friendListResponse/friend-list-response';
import {FriendList} from '../../Entities/friend/friendList/friend-list';

@Injectable({
  providedIn: 'root'
})
export class FriendBackendServiceService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  private mapToFriend(data: any): Friend {
    return {
      friendshipId: data.friendship_id,
      userFriendId: data.userFriendId,
      userId: data.userId,
      isAccepted: data.isAccepted,
      friendsSince: data.friendsSince
    };
  }

  getAllFriendsOfUser(id: number | undefined): Observable<Friend[]> {
    return this.http.get<any[]>(`${this.apiUrl}/friend/controller/findAllFriends/${id}`)
      .pipe(
        // Assuming the API response is an array of objects like the provided example
        map((data: any[]) => data.map(item => this.mapToFriend(item)))
      );
  }

  // getFriendList(id: number | undefined): Observable<Friend[]> {
  //   // @ts-ignore
  //   return this.http.get<FriendListResponse>(`${this.apiUrl}/friend/controller/getFriendList/${id}`).pipe(
  //     map(response => response.friendList)
  //   );
  // }

  getFriendList(id: number | undefined): Observable<FriendList[]> {
    // @ts-ignore
    return this.http.get<FriendListResponse>(`${this.apiUrl}/friend/controller/getFriendList/${id}`).pipe(
      map(response => response.friendList)
    );
  }


}
