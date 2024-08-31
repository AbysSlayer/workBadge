import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserManagement {
  private apiURL = 'http://localhost:4000/api/v1/users';

  constructor(private http: HttpClient){}

  findAllUsers(): Observable<any>{
    return this.http.get(`${this.apiURL}/findAll`)
  }
  deleteUser(userId: string): Observable<any>{
    return this.http.delete(`${this.apiURL}/deleteUser/${userId}`)
  }

  updateUser(toModifyUID: string, userId: string, username: string, password: string, firstName: string, lastName: string, workerCode: string, ): Observable<any>{
    return this.http.put<any>(`${this.apiURL}/updateUser/${toModifyUID}`, {userId, username, password, firstName, lastName, workerCode})
  }
}