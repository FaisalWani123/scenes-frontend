import {FriendRequestManager} from '../friend/friendRequestManager/friend-request-manager';

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dob?: string;
  role?: string;
  outstandingAmount?: number | null;
  enabled?: boolean;
  accountNonExpired?: boolean;
  credentialsNonExpired?: boolean;
  username?: string;
  authorities?: Authority[];
  accountNonLocked?: boolean;
  male?: boolean;
  requestManager?: FriendRequestManager;
}

export interface Authority {
  authority: string;
}

