import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableViewsComponent} from './components/table-views/table-views.component';
import {MaterialExampleModule} from '../../material.module';
import {DialogConfirmationComponent} from './components/dialog-confirmation'

@NgModule({
  declarations: [TableViewsComponent,DialogConfirmationComponent],
  imports: [
    CommonModule,MaterialExampleModule
  ],
  providers: [],
  exports:[TableViewsComponent,DialogConfirmationComponent]
})
export class LibraryModule { }
