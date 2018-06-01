import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { ValidationService } from '../validation/validation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  translate: TranslateService;
  FormInformation: any;
  FormPassword: any;
  email: string;
  fullname: string;
  phone: string;
  address: string;
  users: User[];
  user: User;
  password: string;
  id: number;
  dataForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
  private route: ActivatedRoute, private translateService: TranslateService) {
  this.translate = translateService;
   translateService.setDefaultLang('vi');
   translateService.use('vi');
   }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = +params['id'];
      this.userService.getUserById(this.id)
      .subscribe(user => {
        this.user = user;
        this.email = user.email;
        this.fullname = user.name;
        this.address = user.address;
        this.phone = user.phone;
      });
    });
  }

  changeInfomation() {
    this.userService.changeInformation(this.id , this.fullname, this.address, this.phone, this.password).subscribe();
    alert('Thay đổi thông tin thành công');
  }

  changePassword() {
    // tslint:disable-next-line:max-line-length
    if (this.FormPassword.dirty && this.FormPassword.valid && this.FormPassword.controls.newPass.value === this.FormPassword.controls.reNewPass.value) {
      alert(`Change Password Success`);
    }
  }

}
