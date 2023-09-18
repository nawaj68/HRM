import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { NewApprovalWorkflow } from '../../model/configurations/newApprovalWorkflow.model';

const routePrefix = '/api/NewApprovalWorkflow';

@Injectable({
  providedIn: 'root'
})
export class NewApprovalWorkflowService extends HttpService<NewApprovalWorkflow>{

  constructor(http: HttpClient) {
    super(http, routePrefix);
   }
   getFilter<T>(pageIndex: number, pageSize: number, sortColumn: string, sortDirection: string, filterText1: string, filterText2: string): Observable<T[]> {
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("filterText1", filterText1)
      .set("filterText2", filterText2);

    return this.http.get<T[]>(`${this.BaseUrl}/filter?${params.toString()}`).pipe(catchError(this.handleError));
  }
  getNewApprovalWorkflowDetail<T>(newApprovalWorkflowId: number): Observable<T> {
    return this.http.get<T[]>(`${this.BaseUrl}/${newApprovalWorkflowId}`).pipe(catchError(this.handleError));
  }
  addNewApprovalWorkflowDetail<T>(newApprovalWorkflow: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, newApprovalWorkflow).pipe(catchError(this.handleError));
  }

  updateNewApprovalWorkflowDetailWithFile<T>(newApprovalWorkflowId: number, newApprovalWorkflow: T, image: any): Observable<T> {
    let formData: FormData = new FormData();
    formData.append("newApprovalWorkflow", JSON.stringify(newApprovalWorkflow));
    return this.http.put<T>(`${this.BaseUrl}/${newApprovalWorkflowId}`, formData).pipe(catchError(this.handleError));
  }

  updateNewApprovalWorkflowDetail<T>(newApprovalWorkflowId: number, newApprovalWorkflow: any): Observable<T> {
    return this.http.put<T>(`${this.BaseUrl}/${newApprovalWorkflowId}`, newApprovalWorkflow).pipe(catchError(this.handleError));
  }
}
