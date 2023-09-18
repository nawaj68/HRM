import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { EmployeeManagementCategory } from '../model/employeeManagementCategory';

const routePrefix = '/api/employeeManagementCategory';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementCategoryService extends HttpService<EmployeeManagementCategory>{

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

    getEmployeeManagementCategoryDetail<T>(employeeManagementCategoryId: number): Observable<T> {
      return this.http.get<T[]>(`${this.BaseUrl}/${employeeManagementCategoryId}`).pipe(catchError(this.handleError));
    }

    addEmployeeManagementCategoryDetail<T>(employeeManagementCategory: T): Observable<T> {
      return this.http.post<T>(this.BaseUrl, employeeManagementCategory).pipe(catchError(this.handleError));
    }

    updateEmployeeManagementCategoryWithFile<T>(employeeManagementCategoryId: number, employeeManagementCategory: T, image: any): Observable<T> {
      let formData: FormData = new FormData();
      formData.append("employeeManagementCategory", JSON.stringify(employeeManagementCategory));
      formData.append("image", image);
      //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
      return this.http.put<T>(`${this.BaseUrl}/${employeeManagementCategoryId}`, formData).pipe(catchError(this.handleError));
    }

    updateEmployeeManagementCategoryDetail<T>(employeeManagementCategoryId: number, employeeManagementCategory  : any): Observable<T> {
      return this.http.put<T>(`${this.BaseUrl}/${employeeManagementCategoryId}`, employeeManagementCategory).pipe(catchError(this.handleError));
    }

}
