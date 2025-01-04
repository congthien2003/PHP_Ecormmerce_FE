import { TestBed } from '@angular/core/testing';

import { UploadSupabaseService } from './upload-supabase.service';

describe('UploadSupabaseService', () => {
  let service: UploadSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
