import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin: boolean = false;

  constructor(private httpClient: HttpClient) { }

  loginUser(userCredentials: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>('/api/login', userCredentials);
  }
  
  signUpUser(userCredentials: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>('/api/users/signup', userCredentials);
  }

  setLogin(token: string) {
    try {
      this.isLogin = true;
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('STATE', 'true');
    } catch (e: any) {
      console.log(e);
      this.logout();
    }
  }

  logout() {
    this.isLogin = false;
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('STATE', 'false');
  }

  isLoggedIn(): boolean {
    const loggedIn = localStorage.getItem('STATE');
    this.isLogin = (loggedIn === 'true');
    const token = localStorage.getItem('TOKEN');
    if (token && token !== '') {
      if (this._tokenExpired(token)) {
        this.logout();
      } else {
        return this.isLogin;
      }
    } else {
      this.logout();
    }
    return false;
  }
  
  private _tokenExpired(token: string) {
    const decodedToken: any = jwt_decode(token);
    return (Date.now() >= decodedToken.exp * 1000);
  }

}