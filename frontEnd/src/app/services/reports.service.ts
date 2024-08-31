import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Badge } from '../interfaces/badge';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = 'http://localhost:4000/api/v1/badges'
  constructor(private http: HttpClient) { }

  badgesPerMonth(): Observable<any>{
    return this.http.get(`${this.apiUrl}/badgesPerMonth`)
  }

  detailedBadgesPerMonth(month: number, year: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/detailedBadgesPerMonth/${year}/${month}`)
  }
}
