import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { EmploymentCategory } from '../../model/configurations/employmentCategory.model';
const routePrefix = '/api/employmentCategory';
@Injectable({
  providedIn: 'root'
})
export class EmploymentcategoryService extends HttpService<EmploymentCategory> {

  constructor(http :HttpClient) {
    super(http,routePrefix)
   }
   getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      //.set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }
  getEmploymentCategoryDetail<T>(employmentCategoryId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${employmentCategoryId}`).pipe(catchError(this.handleError));
  }
  addEmploymentCategoryDetail<T>(employmentCategory: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, employmentCategory).pipe(catchError(this.handleError));
  }
  updateEmploymentCategoryDetail<T>(employmentCategoryId: number, grade  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${employmentCategoryId}`,grade).pipe(catchError(this.handleError));
  }
}
