import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { MaritalStatus } from '../../model/configurations/maritalStatus.model';


const routePrefix = "/api/maritalStatus";

@Injectable({
  providedIn: 'root'
})
export class MaritalStatusService extends HttpService<MaritalStatus> {
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getMaritalStatusDetail<T>(maritalStatusId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${maritalStatusId}`).pipe(catchError(this.handleError));
  }

  addMaritalStatusDetail<T>(maritalStatus: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, maritalStatus).pipe(catchError(this.handleError));
  }
  updateMaritalStatusDetail<T>(maritalStatusId: number, branchInfo  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${maritalStatusId}`, branchInfo).pipe(catchError(this.handleError));
  }
}