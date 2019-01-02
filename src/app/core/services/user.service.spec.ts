import { TestBed } from '@angular/core/testing';
import { CoreModule } from '../core.module';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [CoreModule]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
