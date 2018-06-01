import { CategoryService } from './services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { MovieService } from './services/movie.service';
import { Cate } from './models/cate';
import { Component, OnInit, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { getLocaleMonthNames } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import { createWiresService } from 'selenium-webdriver/firefox';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieService]
})
export class AppComponent implements OnInit {
  signUpForm: FormGroup;
  title = 'app';
  translateservice: TranslateService;
  userService: UserService;
  netImage: any = '../assets/images/logo.png';
  cates: Cate[];
  users: User[];
  names: string[] = ['vi', 'us'];
  email: string;
  errorMessage: string;
  inputEmail: string;
  inputPassword: string;
  token: string;
  userName: string;
  objSignUp: Object;
  confirmPassword: string;
  fullname: string;
  userLogin: any[];
  address: string;
  phone: string;
  name: string;
  id: string;
  password: string;
  // tslint:disable-next-line:max-line-length
  constructor(private moviesServices: MovieService, private categoryServices: CategoryService, translate: TranslateService, userServices: UserService, private router: Router, private fb: FormBuilder) {
    this.translateservice = translate;
    this.userService = userServices;
    translate.setDefaultLang('vi');
    translate.use('vi');
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      'email': ['', [Validators.required]]
    });
  }

  getCates(): void {
    this.moviesServices.getCates().then(cates => this.cates = cates);
  }

  getCategory(): void {
    this.categoryServices.getCates().subscribe(cates => this.cates = cates);
  }

  languageChange(value) {
    if (value === 'English') {
        this.translateservice.use('en');
    } else if (value === 'VietNam') {
        this.translateservice.use('vi');
    }
  }

  languageEN() {
    this.translateservice.use('en');
  }

  languageVI() {
    this.translateservice.use('vi');
  }

  ngOnInit(): void {
    this.getCategory();
    if (localStorage.getItem('token') !== null) {
      this.token = localStorage.getItem('token');
      this.name = localStorage.getItem('currentName').split('"')[1];
      this.id = localStorage.getItem('currentID');
      this.fullname = this.name;
    } else {
      this.fullname = 'Anonymous user';
      console.log('token logined ', localStorage.getItem('token'));
      console.log(this.fullname);
    }

    this.name = '';
    this.phone = '';
    this.address = '';
    this.email = '';
    this.password = '';

   // jquey code BACK TO TOP
  //  if ( ($(window).height() + 50) < $(document).height() ) {
  //   $('#top-link-block').removeClass('hidden').affix({
  //     // how far to scroll down before link "slides" into view
  //     offset: {top:100}
  //   });
  // }
  }

  onSelect(cate: Cate) {
    this.router.navigate(['/cates', cate.name]);
}

  signIn() {

  this.userService.getLogin(this.inputEmail, this.inputPassword).subscribe(
      (response: Response) => {

         const user = response.json();
         console.log(user.result);

         if ( user.result === ' wrong') 
         {
              $('#login').modal('hide');
              this.inputEmail = '';
              this.inputPassword = '';
              alert('Sai tài khoản hoặc mật khẩu');
         } 
         else {
                    this.token = user.token;
                    this.userLogin = user.userLogin;
                    this.id = this.userLogin[0].id;
                    localStorage.setItem('currentEmail', JSON.stringify( this.userLogin[0].email ));
                    localStorage.setItem('currentAddress', JSON.stringify( this.userLogin[0].address ));
                    localStorage.setItem('currentPhone', JSON.stringify( this.userLogin[0].phone ));
                    localStorage.setItem('currentName', JSON.stringify( this.userLogin[0].name ));
                    localStorage.setItem('currentID', JSON.stringify( this.userLogin[0].id ));
                    localStorage.setItem('token', this.token);
                    this.fullname = localStorage.getItem('currentName').split('"')[1];
                    $('#login').modal('hide');
                    window.location.reload();
                    alert('Đăng nhập thành công');
         }

      });
  }

  signUp() {
    const objUser = new User();
    objUser.name = this.name;
    objUser.phone = this.phone;
    objUser.address = this.address;
    objUser.password = this.password;
    objUser.email = this.email;
    this.userService.signUp(objUser)
    .subscribe(res => {console.log('new account ', res);
    this.token = res;
    localStorage.setItem('token', this.token);
    this.fullname = this.name;
    $('#signup').modal('hide');
    this.name = '';
    this.password = '';
    this.address = '';
    this.address = '';
    this.email = '';
    });

  }

  logOut() {

    localStorage.removeItem('token');
     localStorage.removeItem('currentAddress');
     localStorage.removeItem('currentPhone');
     localStorage.removeItem('currentName');


    this.fullname = 'Anonymous user';
    this.token = null;

    this.router.navigate(['/']);

}

}

