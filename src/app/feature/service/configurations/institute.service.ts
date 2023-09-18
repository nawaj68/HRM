import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Institute } from '../../model/configurations/institute.model';
const routePrefix = '/api/institute';

@Injectable({
  providedIn: 'root'
})
export class InstituteService extends HttpService<Institute> {

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
  getInstituteDetail<T>(instituteId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${instituteId}`).pipe(catchError(this.handleError));
  }
  addInstituteDetail<T>(institute: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, institute).pipe(catchError(this.handleError));
  }
  updateInstituteDetail<T>(instituteId: number, institute  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${instituteId}`,institute).pipe(catchError(this.handleError));
  }
}
