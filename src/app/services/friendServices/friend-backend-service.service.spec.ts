import { TestBed } from '@angular/core/testing';

import { FriendBackendServiceService } from './friend-backend-service.service';

describe('FriendBackendServiceService', () => {
  let service: FriendBackendServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendBackendServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
