import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Designation } from '../../model/configurations/designation.model';


const routePrefix = "/api/designation";
@Injectable({
  providedIn: 'root'
})
export class DesignationService extends HttpService<Designation> {
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getDesignationDetail<T>(designationId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${designationId}`).pipe(catchError(this.handleError));
  }

  addDesignationDetail<T>(designation: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, designation).pipe(catchError(this.handleError));
  }
  updateDesignationDetail<T>(designationId: number, branchInfo  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${designationId}`, branchInfo).pipe(catchError(this.handleError));
  }
}
