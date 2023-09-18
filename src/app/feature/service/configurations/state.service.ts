import {State} from "../../component/enrollee/enrolle-entry/enrolle-entry.component";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {HttpService} from "src/app/core/services/http/http.service";
import {Observable, catchError} from "rxjs";

const routePrefix = "/api/state";

@Injectable({
  providedIn: "root",
})
export class StateService extends HttpService<State> {
  pipe(arg0: any) {
    throw new Error('Method not implemented.');
  }
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getDropdownByCountry<T>(countryId: number, searchText?: string): Observable<T[]> {
    let params = new HttpParams().set("countryId", countryId.toString());
    if (searchText) params.set("searchText", searchText);

    return this.http.get<T[]>(`${this.BaseUrl}/dropdown?${params.toString()}`).pipe(catchError(this.handleError));
  }

  getStateDetail<T>(stateId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${stateId}`).pipe(catchError(this.handleError));
  }

  addStateDetail<T>(state: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, state).pipe(catchError(this.handleError));
  }
  updateStateDetail<T>(stateId: number, branchInfo  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${stateId}`, branchInfo).pipe(catchError(this.handleError));
  }
}
