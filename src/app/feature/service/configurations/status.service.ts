import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Status } from '../../model/configurations/status.model';

const routePrefix = "/api/status";

@Injectable({
  providedIn: 'root'
})
export class StatusService extends HttpService<Status> {
  pipe(arg0: any) {
    throw new Error('Method not implemented.');
  }
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getStatusDetail<T>(statusId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${statusId}`).pipe(catchError(this.handleError));
  }

  addStatusDetail<T>(status: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, status).pipe(catchError(this.handleError));
  }
  
  updateStatusDetail<T>(statusId: number, status  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${statusId}`, status).pipe(catchError(this.handleError));
  }
}
