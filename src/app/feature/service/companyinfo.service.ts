import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CompanyInfo } from '../model/companyinfo.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

const routePrefix = '/api/companyinfo';
@Injectable({
  providedIn: 'root'
})
export class CompanyinfoService extends HttpService<CompanyInfo> {

  constructor(http : HttpClient) { 
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
  getCompanyinfoDetail<T>(companyId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${companyId}`).pipe(catchError(this.handleError));
  }
  addCompanyinfoDetail<T>(companyinfo: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, companyinfo).pipe(catchError(this.handleError));
  }
  updateCompanyinfoWithFile<T>(companyinfoId: number, companyinfo: T): Observable<T> {
    let formData: FormData = new FormData();
   formData.append("companyinfo", JSON.stringify(companyinfo));
    //formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${companyinfoId}`, formData).pipe(catchError(this.handleError));
  }
  updateCompanyDetail<T>(companyinfoId: number, companyinfo  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${companyinfoId}`, companyinfo).pipe(catchError(this.handleError));
  }
}
