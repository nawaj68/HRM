import { Component, OnInit, Inject } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileHandler } from '../../../core/services/file/file.handler';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {

  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public uploadMessage = 'Upload in progress ... ';
  public errorMessage = '';
  public title = '';
  public status = false;

  constructor(public dialogRef: MatDialogRef<UploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fileHandlerService: FileHandler) {
    this.uploader = data.uploader;
    this.title = data.title;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {
    this.uploader.uploadAll();
    this.uploader.onCompleteAll = () => {
    };
    this.uploader.onSuccessItem = (item: any, response: any, status: number, headers: any): any => {
      if (response) {
        const responseObj = JSON.parse(response);
        this.status = responseObj.status;
        this.errorMessage = responseObj.message;
        this.uploadMessage = 'Upload completed.';
        if (responseObj.file) {
          const binary = atob(responseObj.file);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) { array[i] = binary.charCodeAt(i); }
          this.fileHandlerService.downloadExcel(array, responseObj.filename + ".xlsx");
        }
      }
    };
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: any): any => {
      if (response) {
        const responseObj = JSON.parse(response);
        this.uploadMessage = 'Upload failed.';
        this.errorMessage = responseObj.message;
        item.progress = 100;
      }
    };
  }

  close() {
    this.dialogRef.close({ upload: this.status });
    this.uploader.clearQueue();
  }

}
