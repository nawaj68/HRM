import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Education } from '../model/education.model';

const routePrefix = '/api/Education';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends HttpService<Education>{

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
  getEducationDetail<T>(educationId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${educationId}`).pipe(catchError(this.handleError));
  }
  addEducationDetail<T>(education: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, education).pipe(catchError(this.handleError));
  }

  updateEducationDetailWithFile<T>(educationId: number, education: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("education", JSON.stringify(education));
    return this.http.put<T>(`${this.BaseUrl}/${educationId}`, formData).pipe(catchError(this.handleError));
  }

  updateEducationDetail<T>(educationId: number, education: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${educationId}`, education).pipe(catchError(this.handleError));
  }

}


