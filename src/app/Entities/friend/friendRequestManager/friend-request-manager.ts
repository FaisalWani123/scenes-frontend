import {Friend} from '../friend';

export class FriendRequestManager {
  friend?: Friend;
  requestSent?: boolean;
  requestAccepted?: boolean;
  cancelRequest?: boolean;
}
