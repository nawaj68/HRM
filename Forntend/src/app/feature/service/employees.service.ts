import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Employees } from '../model/employees.model';

const routePrefix = '/api/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends HttpService<Employees> {
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
  getEmployeesDetail<T>(employeesId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${employeesId}`).pipe(catchError(this.handleError));
  }
  addEmployeesDetail<T>(employees: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, employees).pipe(catchError(this.handleError));
  }
  updateEmployeesWithFile<T>(employeesId: number, employees: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("employees", JSON.stringify(employees));
    formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${employeesId}`, formData).pipe(catchError(this.handleError));
  }
  updateUserDetail<T>(employeesId: number, employees  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${employeesId}`, employees).pipe(catchError(this.handleError));
  }

}
