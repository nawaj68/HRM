import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { DistributeAsset } from '../model/distributeAsset.model';


const routePrefix = '/api/DistributeAsset';


@Injectable({
  providedIn: 'root'
})
export class DistributeAssetService extends HttpService<DistributeAsset>{

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
  getDistributeAssetDetail<T>(distributeAssetId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${distributeAssetId}`).pipe(catchError(this.handleError));
  }
  addDistributeAssetDetail<T>(distributeAsset: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, distributeAsset).pipe(catchError(this.handleError));
  }

  updateDistributeAssetDetailWithFile<T>(distributeAssetId: number, distributeAsset: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("distributeAsset", JSON.stringify(distributeAsset));
    return this.http.put<T>(`${this.BaseUrl}/${distributeAssetId}`, formData).pipe(catchError(this.handleError));
  }

  updateDistributeAssetDetail<T>(distributeAssetId: number, distributeAsset: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${distributeAssetId}`, distributeAsset).pipe(catchError(this.handleError));
  }

}



