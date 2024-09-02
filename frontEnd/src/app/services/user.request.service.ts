import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class userRequestService {
  private apiUrl = 'http://localhost:4000/api/v1/requests';
  private badgeUrl = 'http://localhost:4000/api/v1/badges';

  constructor(private http: HttpClient) {}

  createRequest(formData: FormGroup): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addRequest`, formData);
  }

  getUserRequests(reqWorkerCode: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/findByWC/${reqWorkerCode}`);
  }

  getAllRequests(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/findAll`)
  }

  convertToBadge(reqFirstName: string, reqLastName: string, reqWorkerCode: string, userId: string): Observable<any>{
    return this.http.post<any>(`${this.badgeUrl}/addBadge`, {reqFirstName, reqLastName, reqWorkerCode, userId})
  }
}