import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
        'required': 'Please enter your information',
        'invalidCreditCard': 'Is invalid credit card number',
        'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
        'invalidMatchPass': 'Password and Repassword are not match',
        'minlength': `Minimum length ${validatorValue.requiredLength}`,
        'invalidPhone': 'Please enter your number',
        'invalidUsername': 'Username must contain only numbers and letters'
    };

    return config[validatorName];
}

static usernameValidator(control) {
  if (control.value.match(/^(?=(?![0-9])?[A-Za-z0-9]?[._-]?[A-Za-z0-9]+).{3,20}/)) {
       return null;
  } else {
      return { 'invalidUsername': true };
  }
}

static emailValidator(control) {
  // RFC 2822 compliant regex
  // tslint:disable-next-line:max-line-length
  if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
  } else {
      return { 'invalidEmailAddress': true };
  }
}

static passwordValidator(control) {
  // {6,100}           - Assert password is between 6 and 100 characters
  // (?=.*[0-9])       - Assert a string has at least one number
  if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
  } else {
      return { 'invalidPassword': true };
  }
}

static phoneValidator(control) {
  if ( control.value !== '' && !isNaN(control.value.charAt(0)) ) {
      return null;
  } else {
      return { 'invalidPhone': true };
  }
}

}
