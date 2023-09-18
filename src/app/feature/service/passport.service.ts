import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Passport } from '../model/passport.model';

const routePrefix = '/api/passport';
@Injectable({
  providedIn: 'root'
})
export class PassportService extends HttpService<Passport> {

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
  getPassportDetail<T>(passportId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${passportId}`).pipe(catchError(this.handleError));
  }
  addPassportDetail<T>(passport: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, passport).pipe(catchError(this.handleError));
  }

  updatePassportDetailWithFile<T>(passportId: number, passport: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("passport", JSON.stringify(passport));
    return this.http.put<T>(`${this.BaseUrl}/${passportId}`, formData).pipe(catchError(this.handleError));
  }

  updatePassportDetail<T>(passportId: number, passport: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${passportId}`, passport).pipe(catchError(this.handleError));
  }

}

