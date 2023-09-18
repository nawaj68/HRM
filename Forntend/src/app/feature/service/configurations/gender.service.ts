import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Gender } from '../../model/configurations/gender.model';

const routePrefix = "/api/gender";

@Injectable({
  providedIn: 'root'
})
export class GenderService extends HttpService<Gender> {
  constructor(http: HttpClient) {
    super(http, routePrefix);
  }

  getGenderDetail<T>(genderId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${genderId}`).pipe(catchError(this.handleError));
  }

  addGenderDetail<T>(gender: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, gender).pipe(catchError(this.handleError));
  }
  updateGenderDetail<T>(genderId: number, branchInfo  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${genderId}`, branchInfo).pipe(catchError(this.handleError));
  }
}