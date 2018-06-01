import { CategoryService } from './services/category.service';
import { ScheduleModule } from './components/schedule/schedule.module';
import { ScheduleService } from './services/schedule.service';
import { CinemaService } from './services/cinema.service';
import { MovieDetailRoutingModule } from './components/movie-detail/movie-detail-routing.module';
import { MovieDetailModule } from './components/movie-detail/movie-detail.module';
import { FilterByCateroutingModule } from './components/category/filter-by-caterouting.module';
import { FilterByCateModule } from './components/category/filter-by-cate.module';
import { NewsModule } from './components/new-component/news.module';
import { NewsService } from './services/news.service';
import { Ng2PaginationModule } from 'ng2-pagination';
import { HomeModule } from './components/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { CustomFormsModule } from 'ng4-validators';
import { MovieService } from './services/movie.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import './utils/rxjs-extensions';
import { FacebookModule } from 'ngx-facebook';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CinemaComponent } from './components/cinema/cinema.component';
import { AgmCoreModule } from '@agm/core';
import { UserComponent } from './components/user/user.component';
import { ControlMessagesComponent } from './components/validation/control-messages/control-messages.component';
import { ValidationService } from './components/validation/validation.service';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CinemaComponent,
    UserComponent,
    ControlMessagesComponent,
  ],
  imports: [
    Ng2SearchPipeModule,
    AppRoutingModule,
    HomeModule,
    Ng2PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    BrowserModule,
    FilterByCateModule,
    FilterByCateroutingModule,
    ScheduleModule,
    NewsModule,
    HttpModule,
    HttpClientModule,
    MovieDetailModule,
    MovieDetailRoutingModule,
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
    AppRoutingModule
  ],
  // tslint:disable-next-line:max-line-length
  providers: [CinemaService, ValidationService, CategoryService, ScheduleService, MovieService, UserService, NewsService, { provide: XSRFStrategy, useValue: new CookieXSRFStrategy('myCookieName', 'My-Header-Name')}],
  bootstrap: [AppComponent]
})
export class AppModule { }
