import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Asset } from '../model/asset.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

const routePrefix = '/api/asset';
@Injectable({
  providedIn: 'root'
})
export class AssetService extends HttpService<Asset> {

  constructor(http : HttpClient) {
    super(http,routePrefix);
  }
  getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      //.set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }
  getAsetDetail<T>(assetId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${assetId}`).pipe(catchError(this.handleError));
  }
  addAssetDetail<T>(asset: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, asset).pipe(catchError(this.handleError));
  }
  updateAssetDetail<T>(assetId: number, asset  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${assetId}`, asset).pipe(catchError(this.handleError));
  }
}
