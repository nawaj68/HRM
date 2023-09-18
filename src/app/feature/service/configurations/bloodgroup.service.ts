import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BloodGroup } from '../../model/configurations/bloodgroup.model';

const routePrefix = "/api/bloodGroup";

@Injectable({
  providedIn: 'root'
})
export class BloodgroupService extends HttpService<BloodGroup> {
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getBloodGroupDetail<T>(bloodGroupId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${bloodGroupId}`).pipe(catchError(this.handleError));
  }

  addBloodGroupDetail<T>(bloodGroup: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, bloodGroup).pipe(catchError(this.handleError));
  }
  updateBloodGroupDetail<T>(bloodGroupId: number, branchInfo  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${bloodGroupId}`, branchInfo).pipe(catchError(this.handleError));
  }
}