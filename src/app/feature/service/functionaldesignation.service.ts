import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from 'src/app/core/services/http/http.service';
import { FunctionalDesignation } from '../model/functionalDesignation';


const routePrefix = '/api/functionalDesignation';
@Injectable({
  providedIn: 'root'
})
export class FunctionaldesignationService extends HttpService<FunctionalDesignation>{

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
    getFunctionalDetail<T>(functionalId: number): Observable<T> {
      return this.http.get<T[]>(`${this.BaseUrl}/${functionalId}`).pipe(catchError(this.handleError));
    }
    addFunctionalDetail<T>(functionalDesignation: T): Observable<T> {
      return this.http.post<T>(this.BaseUrl, functionalDesignation).pipe(catchError(this.handleError));
    }
    updateFunctionalWithFile<T>(functionalId: number, functionalDesignation: T, image: any): Observable<T> {
      let formData: FormData = new FormData();
      formData.append("functionalDesignation", JSON.stringify(functionalDesignation));
      formData.append("image", image);
      //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
      return this.http.put<T>(`${this.BaseUrl}/${functionalId}`, formData).pipe(catchError(this.handleError));
    }
    updateFunctionalDetail<T>(functionalId: number, functionalDesignation  : any): Observable<T> {
      return this.http.put<T>(`${this.BaseUrl}/${functionalId}`, functionalDesignation).pipe(catchError(this.handleError));
    }

}
