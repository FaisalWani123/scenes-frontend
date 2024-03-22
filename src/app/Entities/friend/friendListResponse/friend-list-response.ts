import {FriendList} from '../friendList/friend-list';

export class FriendListResponse {
  friendList?: FriendList[];
  errorMsg?: string;
  confirmed?: boolean;
}
