import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AssetRequisition } from '../model/assetRequisition.model';

const routePrefix = '/api/AssetRequisition';

@Injectable({
  providedIn: 'root'
})
export class AssetRequisitionService extends HttpService<AssetRequisition>{

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
  getAssetRequisitionDetail<T>(assetRequisitionId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${assetRequisitionId}`).pipe(catchError(this.handleError));
  }
  addAssetRequisitionDetail<T>(assetRequisition: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, assetRequisition).pipe(catchError(this.handleError));
  }

  updateAssetRequisitionDetailWithFile<T>(assetRequisitionId: number, assetRequisition: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("assetRequisition", JSON.stringify(assetRequisition));
    return this.http.put<T>(`${this.BaseUrl}/${assetRequisitionId}`, formData).pipe(catchError(this.handleError));
  }

  updateAssetRequisitionDetail<T>(assetRequisitionId: number, assetRequisition: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${assetRequisitionId}`, assetRequisition).pipe(catchError(this.handleError));
  }

}
