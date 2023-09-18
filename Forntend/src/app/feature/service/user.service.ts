import {HttpService} from "./../../core/services/http/http.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable} from "rxjs";
import {UserInformation} from "../model/user-information.model";

const routePrefix = '/api/userinformation';

@Injectable({
  providedIn: "root",
})
export class UserInformationService extends HttpService<UserInformation> {
  constructor(http: HttpClient) {
  super(http, routePrefix);
  }

  // routePrefixer = () => "/api/user/";

  getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string, filterText2: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      .set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }

  getUserInformationDetail<T>(userInformationId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${userInformationId}`).pipe(catchError(this.handleError));
  }

  addUserDetail<T>(userInformation: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, userInformation).pipe(catchError(this.handleError));
  }

  updateUserDetailWithFile<T>(userInformationId: number, userInformation: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("userinformation", JSON.stringify(userInformation));
    formData.append("image", image);
    //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
    return this.http.put<T>(`${this.BaseUrl}/${userInformationId}`, formData).pipe(catchError(this.handleError));
  }

  updateUserDetail<T>(userInformationId: number, userInformation: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${userInformationId}`, userInformation).pipe(catchError(this.handleError));
  }

  // getAll<T>(path: string): Observable<T> {
  //   return this.http.get<T>(`${this.route}/${path}`);
  // }

  // gets(): Observable<any> {
  //   return this.http.get(routePrefix);
  // }

  // get(id: any): Observable<any> {
  //   return this.http.get(`${baseUrl}/${id}`);
  // }

  // create(data: any): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }

  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }

  // deletes(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  // findByTitle(title: any): Observable<any> {
  //   return this.http.get(`${baseUrl}?title=${title}`);
  // }
}
