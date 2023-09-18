import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { FamilyInfo } from '../model/family-info.model';

const routePrefix = '/api/FamilyInfo';

@Injectable({
  providedIn: 'root'
})
export class FamilyInfoService extends HttpService<FamilyInfo> {

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
  getFamilyInfoDetail<T>(familyInfoId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${familyInfoId}`).pipe(catchError(this.handleError));
  }
  addFamilyInfoDetail<T>(familyInfo: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, familyInfo).pipe(catchError(this.handleError));
  }

  updateFamilyInfoDetailWithFile<T>(familyInfoId: number, familyInfo: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("familyInfo", JSON.stringify(familyInfo));
    //formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${familyInfoId}`, formData).pipe(catchError(this.handleError));
  }

  updateFamilyInfoDetail<T>(familyInfoId: number, familyInfo: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${familyInfoId}`, familyInfo).pipe(catchError(this.handleError));
  }

}
