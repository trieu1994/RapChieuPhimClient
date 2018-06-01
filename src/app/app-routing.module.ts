import { NewsDetailComponent } from './components/new-component/news-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsContentComponent } from './components/new-component/news-content.component';
import { CinemaComponent } from './components/cinema/cinema.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  },
  {
    path: 'news',
    component: NewsContentComponent
  },
  {
    path: 'news/:id',
    component: NewsDetailComponent
  },
  {
    path: 'cinemas/:name/:status',
    component: CinemaComponent,
  },
  {
		path: 'schedule',
		component: ScheduleComponent,
  },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
