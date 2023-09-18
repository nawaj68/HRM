import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { EducationType } from '../../model/configurations/educationtype.model';


const routePrefix = '/api/educationType';
@Injectable({
  providedIn: 'root'
})
export class EducationtypeService extends HttpService<EducationType> {

  constructor(http:HttpClient) { 
    super(http,routePrefix)
  }

  getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      //.set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }
  getEducationtypeDetail<T>(educationtypeId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${educationtypeId}`).pipe(catchError(this.handleError));
  }
  addEducationTypeDetail<T>(educationtype: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, educationtype).pipe(catchError(this.handleError));
  }
  updateEducationTypeDetail<T>(educationtypeId: number, educationtype  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${educationtypeId}`,educationtype).pipe(catchError(this.handleError));
  }
}
