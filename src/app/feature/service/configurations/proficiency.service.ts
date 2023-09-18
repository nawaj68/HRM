import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Proficiency } from '../../model/configurations/proficiency.model';

const routePrefix = "/api/proficiency";

@Injectable({
  providedIn: 'root'
})
export class ProficiencyService extends HttpService<Proficiency> {
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getProficiencyDetail<T>(proficiencyId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${proficiencyId}`).pipe(catchError(this.handleError));
  }

  addProficiencyDetail<T>(proficiency: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, proficiency).pipe(catchError(this.handleError));
  }
  updateProficiencyDetail<T>(proficiencyId: number, proficiency  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${proficiencyId}`, proficiency).pipe(catchError(this.handleError));
  }
}