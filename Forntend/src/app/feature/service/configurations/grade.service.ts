import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Grade } from '../../model/configurations/grade.model';

const routePrefix = '/api/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService extends HttpService<Grade> {

  constructor(http : HttpClient) {
    super(http,routePrefix);
  }
  getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      //.set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }
  getGradeDetail<T>(gradeId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${gradeId}`).pipe(catchError(this.handleError));
  }
  addGradeDetail<T>(grade: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, grade).pipe(catchError(this.handleError));
  }
  updateGradeDetail<T>(gradeId: number, grade  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${gradeId}`,grade).pipe(catchError(this.handleError));
  }
}
