import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { last, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BadgesService {
  private apiURL = 'http://localhost:4000/api/v1/badges';
  
  constructor(private http: HttpClient){}

  findAllBadges(){
    return this.http.get<any>(`${this.apiURL}/findAll`)
  }  

  deleteBadge(userId: string, badgeId: string){
    return this.http.delete<any>(`${this.apiURL}/deleteBadge/${userId}/${badgeId}`)
  }

}