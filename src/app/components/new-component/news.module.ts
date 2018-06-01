import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent } from './news-detail.component';
import { NewsContentComponent } from './news-content.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NewsDetailComponent, NewsContentComponent]
})
export class NewsModule { }
