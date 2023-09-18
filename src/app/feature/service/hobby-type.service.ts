import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HobbyType } from '../model/hobbyType';


const routePrefix = '/api/hobbyType';

@Injectable({
  providedIn: 'root'
})
export class HobbyTypeService extends HttpService<HobbyType>{

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

    getHobbyTypeDetail<T>(hobbyTypeId: number): Observable<T> {
      return this.http.get<T[]>(`${this.BaseUrl}/${hobbyTypeId}`).pipe(catchError(this.handleError));
    }

    addHobbyTypeDetail<T>(hobbyType: T): Observable<T> {
      return this.http.post<T>(this.BaseUrl, hobbyType).pipe(catchError(this.handleError));
    }


    updateHobbyTypeWithFile<T>(hobbyTypeId: number, hobbyType: T, image: any): Observable<T> {
      let formData: FormData = new FormData();
      formData.append("hobbyType", JSON.stringify(hobbyType));
      formData.append("image", image);
      //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
      return this.http.put<T>(`${this.BaseUrl}/${hobbyTypeId}`, formData).pipe(catchError(this.handleError));
    }

    updateHobbyTypeDetail<T>(hobbyTypeId: number, hobbyType  : any): Observable<T> {
      return this.http.put<T>(`${this.BaseUrl}/${hobbyTypeId}`, hobbyType).pipe(catchError(this.handleError));
    }
}
