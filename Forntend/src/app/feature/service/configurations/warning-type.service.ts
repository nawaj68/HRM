import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { WarningType } from '../../model/configurations/warningType.model';

const routePrefix = '/api/WarningType';

@Injectable({
  providedIn: 'root'
})
export class WarningTypeService extends HttpService<WarningType>{

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
  getWarningTypeDetail<T>(warningTypeId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${warningTypeId}`).pipe(catchError(this.handleError));
  }
  addWarningTypeDetail<T>(warningType: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, warningType).pipe(catchError(this.handleError));
  }

  updateWarningTypeDetailWithFile<T>(warningTypeId: number, warningType: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("warningType", JSON.stringify(warningType));
    return this.http.put<T>(`${this.BaseUrl}/${warningTypeId}`, formData).pipe(catchError(this.handleError));
  }

  updateWarningTypeDetail<T>(warningTypeId: number, warningType: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${warningTypeId}`, warningType).pipe(catchError(this.handleError));
  }
}
