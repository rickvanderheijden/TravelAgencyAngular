import {TestBed, tick, fakeAsync} from '@angular/core/testing';
import {TokenService} from './token.service';


const TOKEN_KEY = 'access_token';

describe('TokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(() => {sessionStorage.removeItem(TOKEN_KEY)});

  it('should be created', () => {
    const service: TokenService = TestBed.get(TokenService);
    expect(service).toBeTruthy();
  });

  it('should get a token', fakeAsync(() => {
    const expected = 'testToken';
    sessionStorage.setItem(TOKEN_KEY, 'testToken');
    const service: TokenService = TestBed.get(TokenService);
    service.getAsyncToken().then(result => {
      this.token = result;
    });

    tick(2000);

    expect(this.token).toEqual(expected);
  }))
});
