import { TestBed } from '@angular/core/testing';

import { WsService } from './ws.service';
import { CoreModule } from '../core.module'

describe('WSService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [CoreModule]
  }));

  it('should be created', () => {
    const service: WsService = TestBed.get(WsService);
    expect(service).toBeTruthy();
  });
});
