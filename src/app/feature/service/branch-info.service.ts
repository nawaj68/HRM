import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BranchInfo } from '../model/branchInfo.model';

const routePrefix = '/api/BranchInfo';
@Injectable({
  providedIn: 'root'
})
export class BranchInfoService extends HttpService<BranchInfo> {

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
  getbranchInfoDetail<T>(branchInfoId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${branchInfoId}`).pipe(catchError(this.handleError));
  }
  addbranchInfoDetail<T>(branchInfo: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, branchInfo).pipe(catchError(this.handleError));
  }
  updatebranchInfoWithFile<T>(branchInfoId: number, branchInfo: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("branchInfo", JSON.stringify(branchInfo));
    formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${branchInfoId}`, formData).pipe(catchError(this.handleError));
  }
  updatebranchInfoDetail<T>(branchInfoId: number, branchInfo  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${branchInfoId}`, branchInfo).pipe(catchError(this.handleError));
  }
}
