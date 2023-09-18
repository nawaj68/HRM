import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Project } from './../model/project.model';

const routePrefix = '/api/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService extends HttpService<Project>{

  constructor(http : HttpClient) { 
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
  getProjectDetail<T>(projectId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${projectId}`).pipe(catchError(this.handleError));
  }
  addProjectDetail<T>(project: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, project).pipe(catchError(this.handleError));
  }
  // updateProjectWithFile<T>(projectId: number, project: T): Observable<T> {
  //   let formData: FormData = new FormData();
  //  formData.append("project", JSON.stringify(project));
  //   //formData.append("image", image);
  //   //return this.update<T>(formData, `${this.BaseUrl}/${userInformationId}`, this.multipartHttpOptions).pipe(catchError(this.handleError));
  //   return this.http.put<T>(`${this.BaseUrl}/${projectId}`, formData).pipe(catchError(this.handleError));
  // }
  updateProjectDetail<T>(projectId: number, project  : any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${projectId}`, project).pipe(catchError(this.handleError));
  }
}
