import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Language } from '../model/language.model';


const routePrefix = '/api/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends HttpService<Language> {

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
  getLanguageDetail<T>(languageId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${languageId}`).pipe(catchError(this.handleError));
  }
  addLanguageDetail<T>(language: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, language).pipe(catchError(this.handleError));
  }
  updateLanguageWithFile<T>(languageId: number, language: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("language", JSON.stringify(language));
    formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${languageId}`, formData).pipe(catchError(this.handleError));
  }
  updateLanguageDetail<T>(languageId: number, language  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${languageId}`, language).pipe(catchError(this.handleError));
  }

}
