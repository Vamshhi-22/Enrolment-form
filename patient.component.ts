import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { EnteredData, Extracting } from './patient.module';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PatientService } from '../services/Resolve/patientservice.module';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PatientLock } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  @ViewChild('form') signup: NgForm;
  emp: string = '';
  pushof: Extracting[] = [];
  butdis: boolean = true;
  Pataintdata: FormData = new FormData();
  Enteredata: EnteredData = {
    pfirstname: '',
    plastname: '',
    pphonenumber: '',
    page: '',
    pcity: '',
    pstate: '',
    proomno: '',
  };
  hide1: boolean = true;
  hide2: boolean = true;
  hide3: boolean = true;
  hide4: boolean = true;
  hide5: boolean = true;
  hide6: boolean = true;
  hide7: boolean = true;
  hide8: boolean = true;
  addingdata = {
    pfirstname: '',
    plastname: '',
    pphonenumber: '',
    page: '',
    pcity: '',
    pstate: '',
    proomno: '',
  };
  phn: number = 66666666666;
  constructor(
    private ts: Router,
    private http: HttpClient,
    private pat: PatientService,
    private auth: PatientLock
  ) {}

  ngOnInit(): void {
    //  this.checking();
  }
  logsubmit() {
    if (this.signup.value.userdata.pfirstname != this.emp) {
      this.addingdata.pfirstname = this.Enteredata.pfirstname;
      console.log(this.addingdata.pfirstname + 'firstname of adding');

      let demo = this.pushof;
      console.log(demo + 'demo detaikls');

      for (let i = 0; i < demo.length; i++) {
        if (demo) {
        }
      }
    }

    if (this.Enteredata.pfirstname == this.emp) {
      this.hide1 = false;
    }
    if (this.Enteredata.plastname != this.emp) {
      this.addingdata.plastname = this.Enteredata.plastname;
    } else {
      this.hide2 = false;
    }
    if (this.Enteredata.pphonenumber != this.emp) {
      this.addingdata.pphonenumber = this.Enteredata.pphonenumber;
    } else {
      this.hide3 = false;
    }

    if (this.Enteredata.page != this.emp) {
      this.addingdata.page = this.Enteredata.page;
    } else {
      this.hide4 = false;
    }
    if (this.Enteredata.pcity != this.emp) {
      this.addingdata.pcity = this.Enteredata.pcity;
    } else {
      this.hide5 = false;
    }
    if (this.Enteredata.pstate != this.emp) {
      this.addingdata.pstate = this.Enteredata.pstate;
    } else {
      this.hide6 = false;
    }
    if (this.Enteredata.proomno != this.emp) {
      this.addingdata.proomno = this.Enteredata.proomno;
    } else {
      this.hide7 = false;
    }
    console.log('chudu vasthundi ');
    console.log(this.addingdata.pfirstname + 'locsadfc');

    if (
      this.addingdata.pfirstname != this.emp &&
      this.addingdata.plastname != this.emp &&
      this.addingdata.pphonenumber != this.emp &&
      this.addingdata.page != this.emp &&
      this.addingdata.pcity != this.emp &&
      this.addingdata.pstate != this.emp &&
      this.addingdata.proomno != this.emp
    ) {
      const recvingdata = this.addingdata;
      console.log('etla vasthundi broo asal');
      setTimeout(() => {
        alert('submited succesfully');
        // this.ts.navigate(['/information']);
      }, 1000);

      this.pat.posting(recvingdata).subscribe((response) => {
        this.Enteredata.pfirstname = '';
        this.Enteredata.plastname = '';
        this.Enteredata.pphonenumber = '';
        this.Enteredata.page = '';
        this.Enteredata.pcity = '';
        this.Enteredata.pstate = '';
        this.Enteredata.proomno = '';
      });
    } else {
      this.butdis = true;
    }
  }
  transfer() {
    this.ts.navigate(['/homepage']);
  }
  geting() {
    this.http
      .get('https://gfgyt-3d037-default-rtdb.firebaseio.com/patient.json')
      .pipe(
        map((resp) => {
          const posts = [];
          for (let key in resp) {
            posts.push({ ...resp[key], key });
          }
          return posts;
        })
      )
      .subscribe((respo) => {
        this.pushof = respo;
      });
    // this.http.get('https://gfgyt-3d037-default-rtdb.firebaseio.com/homepage.json').pipe(map((response)=>{
    //   let posts=[];
    //   for(let key in response)
    //   {
    //        posts.push({...response[key],key})
    //   }
    //   return posts;
    // })).subscribe((response)=>
    // {
    //   console.log(response);

    //   this.pushof=response;
    // console.log(this.pushof);

    // })
  }
  checking() {
    console.log('checking logoin');
  }
  goingtoinfor() {
    setTimeout(() => {
      this.ts.navigate(['/information']);
    }, 1000);
  }
}
