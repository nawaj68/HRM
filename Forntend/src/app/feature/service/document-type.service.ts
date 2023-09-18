import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';


const routePrefix = '/api/documentType';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService extends HttpService<DocumentType>{

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

    getDocumentTypeDetail<T>(documentTypeId: number): Observable<T> {
      return this.http.get<T[]>(`${this.BaseUrl}/${documentTypeId}`).pipe(catchError(this.handleError));
    }

    addDocumentTypeDetail<T>(documentType: T): Observable<T> {
      return this.http.post<T>(this.BaseUrl, documentType).pipe(catchError(this.handleError));
    }


    updateDocumentTypeWithFile<T>(documentTypeId: number, documentType: T, image: any): Observable<T> {
      let formData: FormData = new FormData();
      formData.append("documentType", JSON.stringify(documentType));
      formData.append("image", image);
      //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
      return this.http.put<T>(`${this.BaseUrl}/${documentTypeId}`, formData).pipe(catchError(this.handleError));
    }

    updateDocumentTypeDetail<T>(documentTypeId: number, documentType  : any): Observable<T> {
      return this.http.put<T>(`${this.BaseUrl}/${documentTypeId}`, documentType).pipe(catchError(this.handleError));
    }
}
