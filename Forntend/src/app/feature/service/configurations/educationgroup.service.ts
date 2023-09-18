import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { EducationGroup } from '../../model/configurations/educationgroup.model';
const routePrefix = '/api/educationgroup';
@Injectable({
  providedIn: 'root'
})
export class EducationgroupService extends HttpService<EducationGroup> {

  constructor(http:HttpClient) {
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
  getEducationgroupDetail<T>(educationgroupId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${educationgroupId}`).pipe(catchError(this.handleError));
  }
  addEducationgroupDetail<T>(educationgroup: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, educationgroup).pipe(catchError(this.handleError));
  }
  updateEducationgroupDetail<T>(educationgroupId: number, educationgroup  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${educationgroupId}`, educationgroup).pipe(catchError(this.handleError));
  }
}
