import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ClaimType } from '../../model/configurations/claimType.model';


const routePrefix = '/api/ClaimType';

@Injectable({
  providedIn: 'root'
})
export class CliamTypeService extends HttpService<ClaimType>{

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
  getClaimTypeDetail<T>(claimTypeId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${claimTypeId}`).pipe(catchError(this.handleError));
  }
  addClaimTypeDetail<T>(claimType: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, claimType).pipe(catchError(this.handleError));
  }

  updateClaimTypeDetailWithFile<T>(claimTypeId: number, claimType: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("claimType", JSON.stringify(claimType));
    return this.http.put<T>(`${this.BaseUrl}/${claimTypeId}`, formData).pipe(catchError(this.handleError));
  }

  updateClaimTypeDetail<T>(claimTypeId: number, claimType: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${claimTypeId}`, claimType).pipe(catchError(this.handleError));
  }
}
