import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { OpeningYear } from '../../model/configurations/openingYear.model';

const routePrefix = '/api/OpeningYear';

@Injectable({
  providedIn: 'root'
})
export class OpeningYearService extends HttpService<OpeningYear>{

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
  getOpeningYearDetail<T>(openingYearId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${openingYearId}`).pipe(catchError(this.handleError));
  }
  addOpeningYearDetail<T>(openingYear: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, openingYear).pipe(catchError(this.handleError));
  }

  updateOpeningYearDetailWithFile<T>(openingYearId: number, openingYear: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("openingYear", JSON.stringify(openingYear));
    return this.http.put<T>(`${this.BaseUrl}/${openingYearId}`, formData).pipe(catchError(this.handleError));
  }

  updateOpeningYearDetail<T>(openingYearId: number, openingYear: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${openingYearId}`, openingYear).pipe(catchError(this.handleError));
  }
}
