import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  private tokenKey = 'jwt';
  private firstNameKey = 'firstName';
  private lastNameKey = 'lastName';

  constructor() { }

  setToken(token: string, firstName: string, lastName: string): void{
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.firstNameKey, firstName);
    localStorage.setItem(this.lastNameKey, lastName);
  }
  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }
  getFirstName(): string | null{
    return localStorage.getItem(this.firstNameKey);
  }
  getLastName(): string | null{
    return localStorage.getItem(this.lastNameKey);
  }
  deleteToken(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.firstNameKey);
    localStorage.removeItem(this.lastNameKey);
  }

}
