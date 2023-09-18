import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LeaveType } from '../../model/configurations/leaveType.model';

const routePrefix = '/api/LeaveType';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService extends HttpService<LeaveType>{

 
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
  getLeaveTypeDetail<T>(leaveTypeId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${leaveTypeId}`).pipe(catchError(this.handleError));
  }
  addLeaveTypeDetail<T>(leaveType: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, leaveType).pipe(catchError(this.handleError));
  }

  updateLeaveTypeDetailWithFile<T>(leaveTypeId: number, leaveType: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("leaveType", JSON.stringify(leaveType));
    return this.http.put<T>(`${this.BaseUrl}/${leaveTypeId}`, formData).pipe(catchError(this.handleError));
  }

  updateLeaveTypeDetail<T>(leaveTypeId: number, leaveType: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${leaveTypeId}`, leaveType).pipe(catchError(this.handleError));
  }
}
