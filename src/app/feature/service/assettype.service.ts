import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AssetType } from './../model/assettype.model';

const routePrefix = '/api/assettype';

@Injectable({
  providedIn: 'root'
})
export class AssettypeService extends HttpService<AssetType> {

  constructor(http: HttpClient) 
  { super(http, routePrefix); }


  getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      //.set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }
  getassetTypeDetail<T>(assettypeId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${assettypeId}`).pipe(catchError(this.handleError));
  }
  addassetTypeDetail<T>(assettype: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, assettype).pipe(catchError(this.handleError));
  }
  updateassetTypeWithFile<T>(assettypeId: number, assettype: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("assettype", JSON.stringify(assettype));
    formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${assettypeId}`, formData).pipe(catchError(this.handleError));
  }
  updateassetTypeDetail<T>(assettypeId: number, assettype  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${assettypeId}`, assettype).pipe(catchError(this.handleError));
  }
}
