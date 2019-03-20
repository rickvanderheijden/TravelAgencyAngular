import { TestBed } from '@angular/core/testing';
import {TokenService} from './token.service';


const TOKEN_KEY = 'access_token';

describe('TokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  afterEach(() => {localStorage.removeItem(TOKEN_KEY)});

  it('should be created', () => {
    const service: TokenService = TestBed.get(TokenService);
    expect(service).toBeTruthy();
  });

  it('should get a token', () => {
    const expected = 'testToken';
    localStorage.setItem(TOKEN_KEY, 'testToken');
    const service: TokenService = TestBed.get(TokenService);
   service.getAsyncToken().then(result => {
      const token = result;
     expect(token).toEqual(expected);
    });
  })
});
