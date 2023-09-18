import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, map, merge, pipe, share, startWith, Subject, switchMap } from 'rxjs';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { RouteService } from 'src/app/core/services/routes/route.service';
import { FrontRoute } from 'src/app/feature/configs/front-route';
import { Education } from 'src/app/feature/model/education.model';
import { EducationService } from 'src/app/feature/service/education.service';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.scss']
})
export class EducationListComponent implements OnInit {
  frontRoute = FrontRoute;

  userId: number;
  educationId: number;
  user: Education;
  users: Education[];

  
  displayedColumns: string[] = ["employeeId","egucationGroupId", "gradeId", "result","action"];
  dataSource: MatTableDataSource<Education> = new MatTableDataSource();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  pageSize = 5;
  length = 0;

  selection = new SelectionModel<Education>(true, []);
  filterInput: Subject<string> = new Subject<string>();
  filterValue: string = "";

  isLoadingResults = true;
  message = Messages;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, public educationService: EducationService, public routeService: RouteService
    , private messageService: MessageService) { }

    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getData();
    }
    customPipe = pipe(
      share(),
      debounceTime(1000),
      distinctUntilChanged(),
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.load();
      }),
      map((data: any) => {
        this.isLoadingResults = false;
  
        if (data === null) {
          return [];
        }
  
        return data;
      })
    );
  
    customSubscribe = (data: any) => {
      this.users = data.data.data;
      this.dataSource = new MatTableDataSource(data.data.data);
      this.paginator.pageIndex = data.data.pageIndex;
      this.paginator.length = data.data.total;
    };
  
    load(): any {
      return this.educationService.getSearch(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        this.filterValue
      );
    }
  
    getData(): void {
      merge(this.sort.sortChange, this.paginator.page, this.filterInput)
        .pipe(this.customPipe)
        .subscribe((data: any) => {
          this.customSubscribe(data);
        });
    }
  
    reload(reloadType: boolean): void {
      if (reloadType) {
        this.paginator.pageIndex = 0;
        this.filterValue = "";
      }
  
      this.getData();
    }
  
    pageChanged(event: PageEvent) {
      this.paginator.pageSize = event.pageSize;
      this.paginator.pageIndex = event.pageIndex;
    }
  
    search(event: Event): void {
      const value = (event.target as HTMLInputElement).value;
  
      if (this.filterInput.observers.length === 0) {
        this.filterInput.pipe(debounceTime(1000), distinctUntilChanged());
      }
  
      this.filterInput.next(value);
      this.filterInput.subscribe((e) => (this.filterValue = e));
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    remove(educationId: number): void {
      if (educationId) {
        this.messageService.confirm().then((result) => {
          if (result.value) {
            this.educationService.delete(educationId).subscribe((e) => {
              this.messageService.success(this.message.deleteSuccess);
              this.reload(true);
            });
          }
        });
      }
    }
  }
  
