import { TestBed } from '@angular/core/testing';

import { ToggleComponentsService } from './toggle-components.service';

describe('ToggleComponentsService', () => {
  let service: ToggleComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
