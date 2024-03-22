import { TestBed } from '@angular/core/testing';

import { PackageServicesService } from './package-services.service';

describe('PackageServicesService', () => {
  let service: PackageServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
