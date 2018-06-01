import { RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { HttpClient , HttpClientModule} from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2PaginationModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCvCQ312KXUpB8P6awEfKSokMO8wSR2syY'
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  }),
  ],
  declarations: [ScheduleComponent]
})
export class ScheduleModule { }
