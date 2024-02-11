import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private globals: Globals) { }

  arr = [{
    username: 'rohit',
    password: '12345',
    companyCode: 5
  }];

  inCurrectCredentials: boolean = false;
  inCurrectCredentialsMsg: string = 'Credentials Incorrect!'
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    companyCode: new FormControl()
  });

  OnKeyUpPress() {
    this.inCurrectCredentials = false;
  }
  onLogin() {
    this.globals.companyCode = "1";
    this.globals.userDetail = { userFullName: 'suraj' };
    this.router.navigate(['/admin']);
    if (this.form.valid) {
      if (this.form.value.username === this.arr[0].username
        && this.form.value.password === this.arr[0].password
        && this.form.value.companyCode === this.arr[0].companyCode) {
        this.inCurrectCredentials = false;
        // this.submitEM.emit(this.form.value);
        this.router.navigate(['/admin'])
      } else {
        this.inCurrectCredentials = true;
      }
    }
  }
}
