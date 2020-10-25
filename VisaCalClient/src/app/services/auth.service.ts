import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
export const TOKEN_NAME: string = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private removedTokensSet: Set<string> = new Set<string>();


  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {

    const helper = new JwtHelperService();

    const expirationDate = helper.getTokenExpirationDate(token);

    if (expirationDate === undefined) return null;

    return expirationDate;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user): Observable<any>{
    return this.http
      .post(`${environment.apiUrl}/users/authenticate`, JSON.stringify(user), { headers: this.headers })
      //.catch((err) => { return this._logService.logHttpError('error init execution', err); });
      //localStorage.setItem('ACCESS_TOKEN', "access_token")
  }

  public isLoggedIn() {
    let accessToken = localStorage.getItem('ACCESS_TOKEN');
    return accessToken !== null && !this.removedTokensSet.has(accessToken);
  }
  logout() {
    let accessToken = localStorage.getItem('ACCESS_TOKEN');
    localStorage.removeItem(accessToken);
    this.removedTokensSet.add(accessToken);
    //localStorage.removeItem("expires_at");
  }
}
