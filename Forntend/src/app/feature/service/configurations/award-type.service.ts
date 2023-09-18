import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AwardType } from '../../model/configurations/awardType.model';

const routePrefix = "/api/awardType";

@Injectable({
  providedIn: 'root'
})
export class AwardTypeService extends HttpService<AwardType> {
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }
  getAwardTypeDetail<T>(awardTypeId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${awardTypeId}`).pipe(catchError(this.handleError));
  }

  addAwardTypeDetail<T>(awardType: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, awardType).pipe(catchError(this.handleError));
  }
  updateAwardTypeDetail<T>(awardTypeId: number, branchInfo  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${awardTypeId}`, branchInfo).pipe(catchError(this.handleError));
  }
}


