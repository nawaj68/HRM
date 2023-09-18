import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }


  public exportToPdf(jsonData: any, title: any, fileName: string): void {

    const arr: any[] = Object.keys(jsonData[0]);
    let arrLength = arr[0].length;
    const doc = new jsPDF(((arrLength > 4) ? 'l' : 'p'),'mm',((arrLength > 4) ? 'legal' : 'a4'));

    let capitalizeWords = (arr: any) => {
      return arr.map((element: any) => {
        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      });
    }

    const columns: any[] = [capitalizeWords(arr)];
    const data: any[] = [];
    jsonData.forEach((elements: any) => {
      data.push(Object.values(elements));
    });

    autoTable(doc, {
      theme: 'grid',
      head: columns,
      body: data,
      margin: {horizontal:5,top: 15},
      styles: {overflow: 'linebreak',cellWidth:20},
      didDrawPage: (dataArg) => {
        doc.text(title, dataArg.settings.margin.left, 10);
      }
    });

    doc.save(fileName);
  }


}