import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Supervisor } from '../model/supervisor';

const routePrefix = '/api/supervisor';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService extends HttpService<Supervisor>{

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

    getSupervisorDetail<T>(supervisorId: number): Observable<T> {
      return this.http.get<T[]>(`${this.BaseUrl}/${supervisorId}`).pipe(catchError(this.handleError));
    }

    addSupervisorDetail<T>(supervisor: T): Observable<T> {
      return this.http.post<T>(this.BaseUrl, supervisor).pipe(catchError(this.handleError));
    }

    updateSupervisorWithFile<T>(supervisorId: number, supervisor: T, image: any): Observable<T> {
      let formData: FormData = new FormData();
      formData.append("supervisor", JSON.stringify(supervisor));
      formData.append("image", image);
      //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
      return this.http.put<T>(`${this.BaseUrl}/${supervisorId}`, formData).pipe(catchError(this.handleError));
    }

    updateSupervisorDetail<T>(supervisorId: number, supervisor  : any): Observable<T> {
      return this.http.put<T>(`${this.BaseUrl}/${supervisorId}`, supervisor).pipe(catchError(this.handleError));
    }








}
