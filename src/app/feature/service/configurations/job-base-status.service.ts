import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { JobBaseStatus } from '../../model/configurations/jobbasestatus.model';

const routePrefix = '/api/jobbaseStatus';
@Injectable({
  providedIn: 'root'
})
export class JobBaseStatusService extends HttpService<JobBaseStatus> {

  constructor(http : HttpClient) {
    super(http,routePrefix);
  }
  getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      //.set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }
  getJobbasestatusDetail<T>(jobbasestatusId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${jobbasestatusId}`).pipe(catchError(this.handleError));
  }
  addJobbasestastusDetail<T>(jobbasestatus: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, jobbasestatus).pipe(catchError(this.handleError));
  }
  updateJobbasestatusDetail<T>(jobbasestatusId: number, jobbasestatus  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${jobbasestatusId}`, jobbasestatus).pipe(catchError(this.handleError));
  }
}
