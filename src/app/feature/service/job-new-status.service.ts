import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { JobNewStatus } from '../model/jobNewStatus.model';


const routePrefix = '/api/JobNewStatus';

@Injectable({
  providedIn: 'root'
})
export class JobNewStatusService extends HttpService<JobNewStatus>{

  constructor(http: HttpClient) {
    super(http, routePrefix);
   }
   getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string, filterText2: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      .set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }
  getJobNewStatusDetail<T>(jobNewStatusId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${jobNewStatusId}`).pipe(catchError(this.handleError));
  }
  addJobNewStatusDetail<T>(jobNewStatus: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, jobNewStatus).pipe(catchError(this.handleError));
  }

  updateJobNewStatusDetailWithFile<T>(jobNewStatusId: number, jobNewStatus: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("jobNewStatus", JSON.stringify(jobNewStatus));
    return this.http.put<T>(`${this.BaseUrl}/${jobNewStatusId}`, formData).pipe(catchError(this.handleError));
  }

  updateJobNewStatusDetail<T>(jobNewStatusId: number, jobNewStatus: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${jobNewStatusId}`, jobNewStatus).pipe(catchError(this.handleError));
  }
}
