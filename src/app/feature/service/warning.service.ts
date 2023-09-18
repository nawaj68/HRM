import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Warning } from '../model/warning.model';

const routePrefix = '/api/warning';
@Injectable({
  providedIn: 'root'
})
export class WarningService extends HttpService<Warning> {

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
  getWarningDetail<T>(warningId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${warningId}`).pipe(catchError(this.handleError));
  }
  addWarningDetail<T>(warning: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, warning).pipe(catchError(this.handleError));
  }

  updateWarningDetailWithFile<T>(warningId: number, warning: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("warning", JSON.stringify(warning));
    //formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${warningId}`, formData).pipe(catchError(this.handleError));
  }

  updateWarningDetail<T>(warningId: number, warning: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${warningId}`, warning).pipe(catchError(this.handleError));
  }

}
