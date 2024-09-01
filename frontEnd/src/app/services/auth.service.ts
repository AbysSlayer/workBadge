import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { last, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:4000/api/v1/users';

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.apiURL}/login`, {username, password});
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    localStorage.removeItem('workerCode')
    localStorage.removeItem('role')
  }

  isAuthenticated(): boolean{
    const token = localStorage.getItem('token');
    return !!token
  }

  isAdmin(): boolean{
    const role = localStorage.getItem('role')
    console.log(role)
    return role == 'admin'
  }

  register(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/addUser`, formData)
    .pipe(tap(response => {
      if(response.success){
        console.log(response.userId)
        console.log(response.workerCode)
        console.log(response.role)
        console.log(formData.get('profilePicture'))
        localStorage.setItem('token', response.token)
        localStorage.setItem('userId', response.userId)
        localStorage.setItem('workerCode', response.workerCode)
        localStorage.setItem('role', response.role)
      }
    }));
  }

  checkUserExists(userId: string): Observable<any> {
    return this.http.get<boolean>(`${this.apiURL}/findById/${userId}`);
  }

  getWorkerCode(){
   return localStorage.getItem('workerCode')
  }
}
