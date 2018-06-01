import { Router } from '@angular/router';
import { NewsService } from './../../services/news.service';
import { Component, OnInit } from '@angular/core';
import { New } from '../../models/new';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent implements OnInit {
  news: New[];
  anew: New;
  constructor(private newsService: NewsService, private route: Router) { }

  getNews(): void {
    this.newsService.getNews().subscribe(news => this.news = news);
  }

  selectNew(anew: New) {
    this.route.navigate(['/news', anew.id]);
  }
  ngOnInit() {
    this.getNews();
  }
}
