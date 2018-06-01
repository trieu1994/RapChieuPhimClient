import { Component, OnInit, Input } from '@angular/core';
import {FormGroup , FormControl } from '@angular/forms';
import { ValidationService } from '../validation.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-messages',
  template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
