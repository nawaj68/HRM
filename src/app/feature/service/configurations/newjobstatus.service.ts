import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Newjobstatus } from '../../model/configurations/newjobstatus.model';

const routePrefix = '/api/newJobStatus';
@Injectable({
  providedIn: 'root'
})
export class NewjobstatusService extends HttpService<Newjobstatus> {

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
  getNewjobstatusDetail<T>(assetId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${assetId}`).pipe(catchError(this.handleError));
  }
  addNewjobststusDetail<T>(asset: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, asset).pipe(catchError(this.handleError));
  }
  updateNewjobstatusDetail<T>(assetId: number, asset  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${assetId}`, asset).pipe(catchError(this.handleError));
  }
}
