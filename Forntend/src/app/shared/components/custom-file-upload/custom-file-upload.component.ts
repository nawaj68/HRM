import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-file-upload',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CustomFileUploadComponent,
    multi: true
  }],
  templateUrl: './custom-file-upload.component.html',
  styleUrls: ['./custom-file-upload.component.scss']
})
export class CustomFileUploadComponent implements ControlValueAccessor {
  @Input() progress;
  onChange: Function;
  private file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }
}


// https://www.geeksforgeeks.org/angular-file-upload/
// https://blog.angular-university.io/angular-file-upload/
// https://stackoverflow.com/questions/47936183/angular-file-upload
// https://stackoverflow.com/questions/40214772/file-upload-in-angular