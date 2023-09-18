import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Contact } from '../model/contact.model';

const routePrefix = '/api/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends HttpService<Contact> {

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
  getContactDetail<T>(contactId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${contactId}`).pipe(catchError(this.handleError));
  }
  addContactDetail<T>(contact: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, contact).pipe(catchError(this.handleError));
  }
  updateContactWithFile<T>(contactId: number, contact: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("contact", JSON.stringify(contact));
    formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${contactId}`, formData).pipe(catchError(this.handleError));
  }
  updateContactDetail<T>(contactId: number, contact  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${contactId}`, contact).pipe(catchError(this.handleError));
  }

}
