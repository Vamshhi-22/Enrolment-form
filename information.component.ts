import { Component, OnInit, DoCheck } from '@angular/core';
import { PatientService } from '../services/Resolve/patientservice.module';
import { Extracting } from '../patient/patient.module';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Deletedetails, InformationDetails } from './infor.module';
import { DataService } from '../services/pageser.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  adding: Extracting[] = [];
  constructor(
    private http: PatientService,
    private hht: HttpClient,
    private ts: Router,
    private route: ActivatedRoute,
    private dataser: DataService
  ) {}
  dataEntry: InformationDetails = {
    pfirstname: '',
    plastname: '',
    pphonenumber: '',
    page: '',
    pcity: '',
    pstate: '',
    proomno: '',
  };
  deletadata: Deletedetails = {
    pfirstname: '',
    plastname: '',
    pphonenumber: '',
    page: '',
    pcity: '',
    pstate: '',
    proomno: '',
  };
  hiding: boolean = false;
  hiding2: boolean = true;
  hiding3: boolean = true;
  currentPageIndex = 0;
  currentPageData: any[] = [];
  key: any;
  chew: boolean = false;
  searchdata: string = '';
  key1: any;
  ngOnInit(): void {
    this.getting();
    this.adding;
    this.deleting;
  }

  transfer() {
    this.ts.navigate(['/']);
  }
  getting() {
    this.hht
      .get('https://gfgyt-3d037-default-rtdb.firebaseio.com/patient.json')
      .pipe(
        map((response) => {
          let posts = [];
          for (let key in response) {
            posts.push({ ...response[key], key });
          }
          return posts;
        })
      )
      .subscribe((respo) => {
        console.log(respo);
        this.adding = respo;
        console.log(this.adding + 'ravali');
      });

    for (let det of this.adding) {
    }
  }
  editing(details) {
    console.log(JSON.stringify(details) + ' checkinname ');

    this.dataEntry.pfirstname = details.pfirstname;
    this.dataEntry.pphonenumber = details.pphonenumber;
    this.dataEntry.plastname = details.plastname;
    this.dataEntry.page = details.page;
    this.dataEntry.proomno = details.proomno;
    console.log(details.key + 'checking key');
    this.key = details.key;
    console.log(this.key + 'key data of');
    console.log(this.dataEntry);
    this.hiding = true;
    this.hiding2 = false;
  }
  getingpt() {
    this.ts.navigate(['/patient']);
  }
  submiting() {
    // setTimeout(() => {
    //   this.ts.navigate(['/information']);
    // }, 1000);
    setTimeout(() => {
      this.hht
        .put(
          `https://gfgyt-3d037-default-rtdb.firebaseio.com/patient/${this.key}.json`,
          this.dataEntry
        )
        .subscribe(
          (resp) => {
            console.log(resp + 'response checking');
            this.getting();
            this.hiding = false;
            console.log('checkimg edit');
            this.ngOnInit();
            this.getting();
            this.hiding2 = true;
            this.hiding3 = true;
          },
          (error) => {
            console.log(error);
          }
        );
    }, 1000);
  }
  deleting(det) {
    this.deletadata.pfirstname = det.pfirstname;
    this.deletadata.plastname = det.plastname;
    this.deletadata.page = det.page;
    this.deletadata.proomno = det.proomno;
    this.deletadata.pphonenumber = det.pphonenumber;
    this.key1 = det.key;
    this.hiding3 = false;
    this.hiding = true;
  }
  deletingof() {
    alert('are you sure');

    setTimeout(() => {
      this.hht
        .delete(
          `https://gfgyt-3d037-default-rtdb.firebaseio.com/patient/${this.key1}.json`
        )
        .subscribe((response) => {
          console.log(response);
          this.ngOnInit();
        });
    }, 1000);
    this.hiding = true;
    this.hiding3 = false;
    this.chew = true;

    this.lok();
  }

  lok() {
    this.hiding3 = true;
    this.hiding = false;
  }
  backing() {
    this.hiding2 = true;
    this.hiding = false;
  }
  bas1() {
    this.hiding3 = true;
    this.hiding = false;
  }
  loadpageData(pageIndex: number): void {
    this.currentPageData = this.dataser.getPage(pageIndex);
  }
  goToPreviousPage(): void {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.loadpageData(this.currentPageIndex);
    }
  }
  gotonextpage(): void {
    this.currentPageIndex++;
    this.loadpageData(this.currentPageIndex);
  }
}
