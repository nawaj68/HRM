import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import { DocumentCategory } from '../../model/configurations/documentCategory.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
const routePrefix = "/api/documentCategory";
@Injectable({
  providedIn: 'root'
})
export class DocumentcategoryService extends HttpService<DocumentCategory>{

  constructor(http:HttpClient) { 
    super(http,routePrefix)
  }
  getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      //.set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }
  getDocumentCategoryDetail<T>(documentCategoryId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${documentCategoryId}`).pipe(catchError(this.handleError));
  }
  addDocumentCategoryDetail<T>(documentCategory: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, documentCategory).pipe(catchError(this.handleError));
  }
  updateDocumentCategoryDetail<T>(documentCategoryId: number, employmentCategory  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${documentCategoryId}`,employmentCategory).pipe(catchError(this.handleError));
  }
}
