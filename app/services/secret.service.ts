import {Injectable} from '@angular/core';

@Injectable()
export class SecretService {
  public get adalConfig(): any {
    return {
      tenant: '56d9ab50-1409-48a1-99c9-e91dfdc9aec9',
      clientId: '45690a9f-e653-49f8-ac1a-387c33ebf8a9',
      redirectUri: window.location.origin + '/',
      postLogoutRedirectUri: window.location.origin + '/'
    };
  }
}
