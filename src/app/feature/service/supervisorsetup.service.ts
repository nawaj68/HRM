import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { SupervisorSetup } from '../model/supervisorsetup';


const routePrefix = '/api/supervisorsetup';

@Injectable({
  providedIn: 'root'
})
export class SupervisorsetupService extends HttpService<SupervisorSetup>{

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

    getSupervisorSetupDetail<T>(supervisorSetupId: number): Observable<T> {
      return this.http.get<T[]>(`${this.BaseUrl}/${supervisorSetupId}`).pipe(catchError(this.handleError));
    }

    addSupervisorSetupDetail<T>(supervisorSetup: T): Observable<T> {
      return this.http.post<T>(this.BaseUrl, supervisorSetup).pipe(catchError(this.handleError));
    }


    updateSupervisorSetupWithFile<T>(supervisorSetupId: number, supervisorSetup: T, image: any): Observable<T> {
      let formData: FormData = new FormData();
      formData.append("supervisorSetup", JSON.stringify(supervisorSetup));
      formData.append("image", image);
      //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
      return this.http.put<T>(`${this.BaseUrl}/${supervisorSetupId}`, formData).pipe(catchError(this.handleError));
    }

    updateSupervisorSetupDetail<T>(supervisorSetupId: number, supervisorSetup  : any): Observable<T> {
      return this.http.put<T>(`${this.BaseUrl}/${supervisorSetupId}`, supervisorSetup).pipe(catchError(this.handleError));
    }
}
