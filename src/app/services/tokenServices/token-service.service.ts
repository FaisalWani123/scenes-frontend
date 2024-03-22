import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  private tokenKey = 'jwt';
  private emailKey = 'email';
  private idKey = 'id';


  constructor() { }

  setToken(token: string, email: string): void{
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.emailKey, email);

  }
  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }
  getEmail(): string | undefined{
    // @ts-ignore
    return localStorage.getItem(this.emailKey);
  }

  deleteToken(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.emailKey);
  }

}
