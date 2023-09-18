import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { merge, pipe, Subject, share, debounceTime, distinctUntilChanged, startWith, switchMap, map } from 'rxjs';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { RouteService } from 'src/app/core/services/routes/route.service';
import { FrontRoute } from 'src/app/feature/configs/front-route';
import { Employees } from 'src/app/feature/model/employees.model';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { ExportService } from 'src/app/feature/service/export.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeesListComponent implements OnInit {

  frontRoute = FrontRoute;
  userId: number;
  employeesId: number;
  emplyee: Employees;
  emplyees: Employees[];

  displayedColumns: string[] = ["avatar", "name", "phone", "email", "gender", "action"];
  dataSource: MatTableDataSource<Employees> = new MatTableDataSource();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  pageSize = 5;
  length = 0;

  selection = new SelectionModel<Employees>(true, []);
  filterInput: Subject<string> = new Subject<string>();
  filterValue: string = "";

  isLoadingResults = true;
  message = Messages;

  downloadingPDF: boolean = false

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public employeesService: EmployeesService,
    public exportService: ExportService,
    public routeService: RouteService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void { }

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
    this.emplyees = data.data.data;
    this.dataSource = new MatTableDataSource(data.data.data);
    this.paginator.pageIndex = data.data.pageIndex;
    this.paginator.length = data.data.total;
  };

  load(): any {
    return this.employeesService.getSearch(
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

  remove(employeesId: number): void {
    if (employeesId) {
      this.messageService.confirm().then((result) => {
        if (result.value) {
          this.employeesService.delete(employeesId).subscribe((e) => {
            this.messageService.success(this.message.deleteSuccess);
            this.reload(true);
          });
        }
      });
    }
  }

  exportToExcel() {
    this.exportService.exportExcel(this.emplyees, 'employee');
  }

  exportToPdf() {
    this.exportService.exportToPdf(this.emplyees, 'Employee List', 'employees');
  }

  downloadPdf() {
    this.downloadingPDF = true;
    let doc = new jsPDF();
    autoTable(
      doc,
      {
        html: '#mat-table',
        theme: 'grid',
        columns:
          [
            { header: 'Picture', dataKey: 'avatar' },
            { header: 'Name', dataKey: 'name' },
            { header: 'Phone', dataKey: 'phone' },
            { header: 'Email', dataKey: 'email' },
          ],

      });
    doc.save('test.pdf');

  }


}
