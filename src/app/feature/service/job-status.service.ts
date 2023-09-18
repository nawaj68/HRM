import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { JobStatus } from '../model/jobStatus.model';

const routePrefix = '/api/jobStatus';

@Injectable({
  providedIn: 'root'
})
export class JobStatusService extends HttpService<JobStatus> {

  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      //.set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }
  getJobStatusDetail<T>(jobstatusId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${jobstatusId}`).pipe(catchError(this.handleError));
  }
  addJobStatusDetail<T>(jobstatus: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, jobstatus).pipe(catchError(this.handleError));
  }
  updateJobStatusWithFile<T>(jobstatusId: number, jobstatus: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("jobstatus", JSON.stringify(jobstatus));
    formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${jobstatusId}`, formData).pipe(catchError(this.handleError));
  }
  updateJobStatusDetail<T>(jobstatusId: number, jobstatus  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${jobstatusId}`, jobstatus).pipe(catchError(this.handleError));
  }
}