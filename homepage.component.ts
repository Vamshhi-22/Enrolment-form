import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SignUpDetails } from '../services/signup.module';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Hompage1, homepage2, SignUpForm } from './homepage.module';
import { HomeService1 } from '../home1.service';
import { PatientLock } from '../services/patient.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  @ViewChild('form') signup: NgForm;
  @ViewChild('form1') Login: NgForm;
  disable: boolean = false;
  checking: boolean = false;
  homedisable: boolean = false;
  signupdisable: boolean = true;
  dis: boolean = true;
  pushof: Hompage1[] = [];
  pushof1: Hompage1[] = [];
  loghi: boolean = true;

  signInForm: SignUpForm = new SignUpForm();

  err = null;

  detailsdisable: boolean = true;
  pichi: boolean = true;
  k: boolean = false;
  l: boolean = false;
  diddid = true;
  userdata1: homepage2 = {
    firstname: '',
    name: '',
    password1: '',
    confirm: '',
    phonenumber1: '',
  };
  newdata = {
    firstname: '',
    name: '',
    password1: '',
    phonenumber: '',
    confirm: '',
  };
  logindata = {
    name: '',
    password: '',
  };
  naming: string = '';
  chew: boolean = false;
  chew1: boolean = false;
  con: boolean;
  va: number = 1;
  emp: string = '';
  num: number = 0;
  constructor(
    public ts: Router,
    private ms: SignUpDetails,
    private http: HttpClient,
    private route: ActivatedRoute,
    private auth: HomeService1,
    private aut: PatientLock
  ) {}
  ngOnInit(): void {
    this.geting();

    this.route.data.subscribe((data: Params) => {
      console.log('data' + data);
    });
  }

  onsubmit() {
    if (this.userdata1.firstname != this.emp) {
      this.newdata.firstname = this.userdata1.firstname;
    }
    if (this.signup.value.userdata.name != this.emp) {
      this.newdata.name = this.userdata1.name;
    } else {
    }
    if (this.signup.value.userdata.phonenumber1 != this.emp) {
      this.newdata.phonenumber = this.signup.value.userdata.phonenumber1;
    } else {
    }
    if (this.userdata1.password1 != this.emp) {
      this.newdata.password1 = this.userdata1.password1;
    } else {
    }
    if (this.signup.value.userdata.confirm != this.emp) {
      this.newdata.confirm = this.signup.value.userdata.confirm;
    } else {
    }

    if (
      this.userdata1.confirm === this.userdata1.password1 &&
      this.userdata1.confirm != this.emp
    ) {
      this.newdata.confirm = this.signup.value.userdata.confirm;
    } else {
      console.log('errors');
      this.con = false;
    }

    this.http
      .get('https://gfgyt-3d037-default-rtdb.firebaseio.com/homepage.json')
      .pipe(
        map((response) => {
          let posts = [];
          for (let key in response) {
            posts.push({ ...response[key], key });
          }
          return posts;
        })
      )
      .subscribe((response) => {
        console.log(response);

        this.pushof1 = response;
        for (let i = 0; i < this.pushof1.length; i++) {
          if (this.pushof1[i].firstname === this.userdata1.firstname) {
            alert('alredyexistr');
            this.num++;
            this.chew1 = true;
            this.userdata1.firstname = '';
          } else {
            this.chew1 = false;
          }
        }
        console.log(this.chew1 + 'chew 1111');

        if (this.chew1 === false && this.num < 0) {
          this.sub();
          this.userdata1.firstname = '';
          this.userdata1.confirm = '';
          this.userdata1.name = '';
          this.userdata1.password1 = '';
          this.userdata1.phonenumber1 = '';
          this.signupdisable = true;
          this.loghi = false;
        }
        console.log(this.pushof1);
      });
    console.log(this.newdata.password1 + 'password');

    if (
      this.signup.value.userdata.firstname != '' &&
      this.signup.value.userdata.name != '' &&
      this.signup.value.userdata.phonenumber1 != '' &&
      this.userdata1.password1 != '' &&
      this.signup.value.userdata.confirm != ''
    ) {
    } else {
      alert(' plese fill the data');
    }

    // this.loginhi=false;
  }
  sub() {
    console.log(JSON.stringify(this.newdata));

    const postdata = this.newdata;

    console.log(JSON.stringify(postdata) + 'post data');
    this.ms.createpost(postdata).subscribe((response) => {});
  }

  sending1() {
    this.disable = false;
    this.dis = true;
    this.signupdisable = true;
  }
  sending() {
    this.disable = true;
    this.dis = false;
    this.signupdisable = false;
    this.loghi = true;
  }
  geting() {
    this.http
      .get('https://gfgyt-3d037-default-rtdb.firebaseio.com/homepage.json')
      .pipe(
        map((response) => {
          let posts = [];
          for (let key in response) {
            posts.push({ ...response[key], key });
          }
          return posts;
        })
      )
      .subscribe((response) => {
        console.log(response);

        this.pushof = response;
        console.log(this.pushof);
      });
  }

  logsubmit(formData) {
    console.log('formData:', formData);
    for (let det of this.pushof) {
      if (this.signInForm.name != ' ' && this.signInForm.name === det.name) {
        console.log('username is matched.');
        this.k = true;
      }
      if (
        this.signInForm.password1 === det.password1 &&
        this.signInForm.password1 != ''
      ) {
        console.log('password matched');
        this.l = true;
      }
    }
    if (this.k === true && this.l === true) {
      this.loghi = true;
      this.aut.login();
      alert('user found');
      this.ts.navigate(['/information']);
      //  this.ts.navigate(['/information']);
      this.disable = true;
      this.signupdisable = true;
      this.loghi = true;
    } else {
      alert('user not found');

      this.pichi = true;
      this.loghi = false;
      this.detailsdisable = false;
      this.homedisable = false;
      this.diddid = true;
      this.auth.logeout();
    }
  }
  loginmet() {
    console.log('checking singh');

    this.loghi = false;
    this.signupdisable = true;
    this.detailsdisable = true;
  }
  back() {
    this.signupdisable = true;
    this.userdata1.firstname = '';
    this.userdata1.confirm = '';
    this.userdata1.name = '';
    this.userdata1.password1 = '';
    this.userdata1.phonenumber1 = '';
    this.pichi = true;
  }
  clicking1() {
    this.homedisable = true;
    this.diddid = false;
  }
  backing3() {
    this.ts.navigate(['/']);
    this.diddid = true;
    this.homedisable = false;
  }
}
