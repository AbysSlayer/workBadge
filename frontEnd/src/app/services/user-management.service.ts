import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';


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

  updateUser(toModifyUID: string, formData: FormGroup): Observable<any>{
    return this.http.put<any>(`${this.apiURL}/updateUser/${toModifyUID}`, formData)
  }

  getUser(userId: string): Observable<any>{
    return this.http.get(`${this.apiURL}/getUserById/${userId}`)
  }
}