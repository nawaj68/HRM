import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Department } from '../../model/configurations/department.model';

const routePrefix = "/api/department";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends HttpService<Department> {
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getDropdownByDesignation<T>(designationId: number, searchText?: string): Observable<T[]> {
    let params = new HttpParams().set("designationId", designationId.toString());
    if (searchText) params.set("searchText", searchText);

    return this.http.get<T[]>(`${this.BaseUrl}/dropdown?${params.toString()}`).pipe(catchError(this.handleError));
  }

  getDepartmentDetail<T>(departmentId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${departmentId}`).pipe(catchError(this.handleError));
  }

  addDepartmentDetail<T>(department: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, department).pipe(catchError(this.handleError));
  }
  updateDepartmentDetail<T>(departmentId: number, branchInfo  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${departmentId}`, branchInfo).pipe(catchError(this.handleError));
  }
}
