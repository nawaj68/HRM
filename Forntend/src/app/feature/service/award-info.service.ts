import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AwardInfo } from '../model/award-info.model';

const routePrefix = '/api/awardInfo';

@Injectable({
  providedIn: 'root'
})
export class AwardInfoService extends HttpService<AwardInfo>{
  

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

  getAwardInfoDetail<T>(id: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addAwardInfoDetail<T>(awardInfo: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, awardInfo).pipe(catchError(this.handleError));
  }

  updateAwardInfoDetailWithFile<T>(id: number, awardInfo: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("awardInfo", JSON.stringify(awardInfo));
    formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${id}`, formData).pipe(catchError(this.handleError));
  }

  updateAwardInfoDetail<T>(id: number, awardInfo: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${id}`, awardInfo).pipe(catchError(this.handleError));
  }

}

