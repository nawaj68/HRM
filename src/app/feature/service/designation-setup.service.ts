import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { DesignationSetup } from '../model/designationSetup.model';

const routePrefix = '/api/designationSetup';

@Injectable({
  providedIn: 'root'
})
export class DesignationSetupService extends HttpService<DesignationSetup> {

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
  getDesignationSetupDetail<T>(designationSetupId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${designationSetupId}`).pipe(catchError(this.handleError));
  }
  addDesignationSetupDetail<T>(designationSetup: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, designationSetup).pipe(catchError(this.handleError));
  }
  updateDesignationSetupWithFile<T>(designationSetupId: number, designationSetup: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("designationSetup", JSON.stringify(designationSetup));
    formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${designationSetupId}`, formData).pipe(catchError(this.handleError));
  }
  updateDesignationSetupDetail<T>(designationSetupId: number, designationSetup  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${designationSetupId}`, designationSetup).pipe(catchError(this.handleError));
  }

}
