import {Friend} from '../friend';

export class FindRelationIdResponse {
  relationship?: Friend;
  errorMsg?: string;
  found?: boolean;
}
