import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Rating } from '../../../models/rating';
import { createWiresService } from 'selenium-webdriver/firefox';
declare var $: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'puk-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  private token: string;
  private el: HTMLElement;
  // tslint:disable-next-line:no-inferrable-types
  private defaultCount: number = 1;
  private pukList: number[] = [];
  private pukHoverIndex: number;

  @Input() pukCount: number;
  @Input() pukModel: number;
  @Input() pukEmptyImage: string;
  @Input() pukFullImage: string;
  @Input() pukImageWidth: string;
  @Input() pukImageHeight: string;
  @Input() pukIconBase: string;
  @Input() pukFullIcon: string;
  @Input() pukEmptyIcon: string;
  @Input() pukIconColor: string;
  @Input() pukIconSize: string;
  @Input() rating: number;
  @Input() itemId: number;

  @Output() pukClick = new EventEmitter();
  @Output() pukHover = new EventEmitter();
  constructor(el: ElementRef) {
    this.pukCount = this.pukCount || this.defaultCount;
   }

   // tslint:disable-next-line:use-life-cycle-interface
   ngOnInit() {
    for (let i = 1; i <= this.pukCount; i++) {
        this.pukList.push(i);
    }
    this.token = localStorage.getItem('token');
  }

  addRating(rating: Rating): void {
  }

  private onClick(pukModel: number): void {
    if ( this.token === null) {
       $('#login').modal('show');
    } else {
            this.pukModel = pukModel;
            this.pukClick.emit(pukModel);
            console.log('quantity: ' + pukModel);
    }
  }

  private onMouseEnter(pukModel: number): void {

    this.pukHoverIndex = pukModel;
    this.pukHover.emit(pukModel);
  }


  private onMouseLeave(): void {
      this.pukHoverIndex = null;
  }

  private getClass(index: number): Object {
    if (this.pukEmptyImage && this.pukFullImage) {
        return;
    } else {
        if (this.pukHoverIndex) {
            return index <= this.pukHoverIndex ? this.pukFullIcon + ' ' + this.pukIconBase : this.pukEmptyIcon + ' ' + this.pukIconBase;
        }
        return index <= this.pukModel ? this.pukFullIcon + ' ' + this.pukIconBase : this.pukEmptyIcon + ' ' + this.pukIconBase;
    }
  }

  private getStyle(index: number): Object {
    if (this.pukEmptyImage && this.pukFullImage) {

        let image_url;
        if (this.pukHoverIndex) {
            image_url = index <= this.pukHoverIndex ? this.pukFullImage : this.pukEmptyImage;
        } else {
            image_url = index <= this.pukModel ? this.pukFullImage : this.pukEmptyImage;
        }

        return {
            'background-size': this.pukImageWidth + ' ' + this.pukImageHeight,
            'background-image': 'url(' + image_url + ')',
            'display': 'inline-block',
            'width': this.pukImageWidth,
            'height': this.pukImageHeight
        };
    } else {
        return {
            'color': this.pukIconColor,
            'font-size': this.pukIconSize
        };
    }

  }
}
