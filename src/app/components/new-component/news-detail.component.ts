import { NewsService } from './../../services/news.service';
import { Component, OnInit } from '@angular/core';
import { New } from '../../models/new';
import { ActivatedRoute, Router, Params } from '@angular/router';
declare var owlCarousel: any;
declare var $: any;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'new-detail-component',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  news: New[];
  anew: New;
  constructor(private newsService: NewsService, private route: ActivatedRoute, private router: Router) { }

 // lay news tu service
getNews(): void {
  this.newsService.getNews().subscribe(news => this.news = news);

  }
selectNew(anew: New) {
 this.router.navigate(['/news', anew.id]);
}

ngOnInit(): any {
      this.getNews();
			this.route.params.forEach((params: Params) => {
			const id = +params['id'];
			this.newsService.getNewById(id)
			.subscribe(anew => this.anew = anew);
			});


          // jquey code BACK TO TOP
          if ( ($(window).height() + 50) < $(document).height() ) {
					$('#top-link-block').removeClass('hidden').affix({
						// how far to scroll down before link "slides" into view
						offset: {top: 100}
					});
				}
}

}
