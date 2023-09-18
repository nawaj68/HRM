import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Religion } from '../../model/configurations/religision.model';

const routePrefix = "/api/religion";

@Injectable({
  providedIn: 'root'
})
export class ReligionService extends HttpService<Religion> {
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getReligionDetail<T>(religionId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${religionId}`).pipe(catchError(this.handleError));
  }

  addReligionDetail<T>(religion: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, religion).pipe(catchError(this.handleError));
  }
  updateReligionDetail<T>(religionId: number, religion  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${religionId}`, religion).pipe(catchError(this.handleError));
  }
}