import { RouteService } from './../../../../core/services/routes/route.service';
import { NavService } from './../../../../shared/services/nav.service';
import { FrontRoute } from 'src/app/feature/configs/front-route';
import {UserInformationService} from "./../../../service/user.service";
import {SelectionModel} from "@angular/cdk/collections";
import {Component, OnInit, AfterViewInit, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UserInformation} from "src/app/feature/model/user-information.model";
import {ModalFormCreateComponent} from "../../modal-form-create/modal-form-create.component";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  pipe,
  share,
  startWith,
  Subject,
  switchMap,
} from "rxjs";

@Component({
  selector: "app-enrolle-list",
  templateUrl: "./enrolle-list.component.html",
  styleUrls: ["./enrolle-list.component.scss"],
})
export class EnrolleListComponent implements AfterViewInit, OnInit {
  jsonUrl = "assets/data/users.data.json";
  frontRoute = FrontRoute;

  user: UserInformation;
  users: UserInformation[];
  displayedColumns: string[] = ["select", "firstname", "lastname", "mobileNumber", "email", "gender", "maritalStatus", "action"];
  dataSource: MatTableDataSource<UserInformation> = new MatTableDataSource();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  selection = new SelectionModel<UserInformation>(true, []);
  pageIndex = 0;
  pageSize = 5;
  length = 0;
  filterInput: Subject<string> = new Subject<string>();
  filterValue: string = "";
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, public userService: UserInformationService,
    public routeService: RouteService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
  }

  getData():void{
    merge(this.sort.sortChange, this.paginator.page, this.filterInput)
    .pipe(this.customPipe)
    .subscribe((data: any) => {
      this.customSubscribe(data);
    });
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
    return this.userService.getSearch(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.filterValue
    );
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

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    // this.isAllSelected() ?
    //   this.selection.clear() :
    //   this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserInformation): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.id + 1}`;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalFormCreateComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== "no") {
        // this.load();
      }
    });
  }

  add(): void {
    // this.user = null;
    this.openDialog();
  }

  edit(element: any): void {
    this.user = {...element};
    this.openDialog();
  }

  clone(element: any): void {
    this.user = {...element};
    // this.user.id = null;
    this.openDialog();
  }

  remove(element: any): void {}

  // ChangePage($event) {
  //   this.pagination.pageSize = $event.pageSize;
  //   this.pagination.pageIndex = $event.pageIndex;
  //   this.getAllGroupPolicy();
  // }
}

// https://blog.angular-university.io/angular-material-data-table/
