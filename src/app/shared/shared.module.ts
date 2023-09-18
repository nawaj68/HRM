import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { UploadModalComponent } from './components/upload-modal/upload-modal.component';
import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {ContentTitleComponent} from "./components/layout/content-title/content-title.component";
import {FileUploadModule} from "ng2-file-upload";
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [ContentTitleComponent, UploadModalComponent, BreadcrumbComponent, BreadcrumbsComponent],
  imports: [CommonModule, FileUploadModule, RouterModule],
  exports: [ContentTitleComponent, FileUploadModule, BreadcrumbComponent, BreadcrumbsComponent],
  entryComponents: [UploadModalComponent],
})
export class SharedModule {}
