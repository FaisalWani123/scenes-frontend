import {Friend} from '../friend';

export class FriendRequestResponse {
  friend?: Friend;
  newRelation?: Friend;
  errorMsg?: string;
  confirmed?: boolean;
}
