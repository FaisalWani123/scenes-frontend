import {Package} from '../package';

export class FindAllPackagesResponse {
  packageList?: Package[];
  errorMsg?: string;
  found?: boolean;
}
