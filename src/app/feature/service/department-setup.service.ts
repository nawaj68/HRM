import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { DepartmentSetup } from '../model/departmentSetup.model';

const routePrefix = '/api/departmentSetup';

@Injectable({
  providedIn: 'root'
})
export class DepartmentSetupService extends HttpService<DepartmentSetup> {

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
  getDepartmentSetupDetail<T>(departmentSetupId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${departmentSetupId}`).pipe(catchError(this.handleError));
  }
  addDepartmentSetupDetail<T>(departmentSetup: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, departmentSetup).pipe(catchError(this.handleError));
  }
  updateDepartmentSetupWithFile<T>(departmentSetupId: number, departmentSetup: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("departmentSetup", JSON.stringify(departmentSetup));
    formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${departmentSetupId}`, formData).pipe(catchError(this.handleError));
  }
  updateDepartmentSetupDetail<T>(departmentSetupId: number, departmentSetup  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${departmentSetupId}`, departmentSetup).pipe(catchError(this.handleError));
  }

}
