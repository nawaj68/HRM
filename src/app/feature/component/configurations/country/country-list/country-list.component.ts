import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { debounceTime, distinctUntilChanged, map, merge, pipe, share, startWith, Subject, switchMap } from 'rxjs';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { RouteService } from 'src/app/core/services/routes/route.service';
import { FrontRoute } from 'src/app/feature/configs/front-route';
import { Country } from 'src/app/feature/model/configurations/country.model';
import { CountryService } from 'src/app/feature/service/configurations/country.service';
import { ExportService } from 'src/app/feature/service/export.service';



@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  frontRoute = FrontRoute;
  userId: number;

  country: Country[];
  countrys: Country[];

  displayedColumns: string[] = ["name","code","currency","flag","action"];
  dataSource: MatTableDataSource<Country> = new MatTableDataSource();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  pageSize = 5;
  length = 0;

  selection = new SelectionModel<Country>(true, []);
  filterInput: Subject<string> = new Subject<string>();
  filterValue: string = "";

  isLoadingResults = true;
  message = Messages;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    public dialog: MatDialog, 
    public countryService: CountryService, 
    public exportService:ExportService,
    public routeService: RouteService, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    console.log(this.country)
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
    this.country = data.data.data;
    this.dataSource = new MatTableDataSource(data.data.data);
    this.paginator.pageIndex = data.data.pageIndex;
    this.paginator.length = data.data.total;
  };

  load(): any {
    return this.countryService.getSearch(
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

  remove(countryId: number): void {
    if (countryId) {
      this.messageService.confirm().then((result) => {
        if (result.value) {
          this.countryService.delete(countryId).subscribe((e) => {
            this.messageService.success(this.message.deleteSuccess);
            this.reload(true);
          });
        }
      });
    }
  }

  exportToExcel(){
    this.exportService.exportExcel(this.country, 'countrys');
  }
  exportToPdf(){
    this.exportService.exportToPdf(this.country,'Country List', 'countrys');
  }

  downloadPdf() {
    let doc = new jsPDF();
    autoTable(
      doc,
      {
        html: '#mat-table',
        theme: 'grid',
        columns:
          [
            {dataKey: 'name' },
            {dataKey: 'code' },
            {dataKey: 'currency' },
            {dataKey: 'flag' }
          ],

      });
    doc.save('test.pdf');

  }

}
