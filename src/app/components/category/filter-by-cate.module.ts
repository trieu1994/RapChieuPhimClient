import { CategoryComponent } from './category.component';
import { FilterByCateroutingModule } from './filter-by-caterouting.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FilterByCateroutingModule
  ],
  declarations: [CategoryComponent]
})
export class FilterByCateModule { }
