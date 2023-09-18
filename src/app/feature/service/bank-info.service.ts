import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { BankInfo } from '../model/bank-info';


const routePrefix = '/api/bankInfo';

@Injectable({
  providedIn: 'root'
})
export class BankInfoService extends HttpService<BankInfo>{

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

    getBankInfoDetail<T>(bankInfoId: number): Observable<T> {
      return this.http.get<T[]>(`${this.BaseUrl}/${bankInfoId}`).pipe(catchError(this.handleError));
    }

    addBankInfoDetail<T>(bankInfo: T): Observable<T> {
      return this.http.post<T>(this.BaseUrl, bankInfo).pipe(catchError(this.handleError));
    }

    updateBankInfoWithFile<T>(bankInfoId: number, bankInfo: T, image: any): Observable<T> {
      let formData: FormData = new FormData();
      formData.append("bankInfo", JSON.stringify(bankInfo));
      formData.append("image", image);
      //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
      return this.http.put<T>(`${this.BaseUrl}/${bankInfoId}`, formData).pipe(catchError(this.handleError));
    }

    updateBankInfoDetail<T>(bankInfoId: number, bankInfo  : any): Observable<T> {
      return this.http.put<T>(`${this.BaseUrl}/${bankInfoId}`, bankInfo).pipe(catchError(this.handleError));
    }
}
