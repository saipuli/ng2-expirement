import {Injectable} from '@angular/core';

@Injectable()
export class SecretService {
  public get adalConfig(): any {
    let endpoints = {
      // Map the location of a request to an API to a the identifier of the associated resource
      'http://localhost:5000/': 'https://pulis.co/fd7170b0-2781-4e42-a928-ec114334108d',
    };
    return {
      tenant: '56d9ab50-1409-48a1-99c9-e91dfdc9aec9',
      clientId: '45690a9f-e653-49f8-ac1a-387c33ebf8a9',
      redirectUri: window.location.origin + '/',
      postLogoutRedirectUri: window.location.origin + '/',
      extraQueryParameter: 'nux=1',
      endpoints: endpoints
    };
  }
}
