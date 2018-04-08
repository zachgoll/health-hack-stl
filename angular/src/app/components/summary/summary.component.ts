import { HttpService } from './../../services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @ViewChild('numberForm') numberForm: NgForm;

  constructor(private http: HttpService) { }

  logs: any = [];
  currentNum = '';
  public pieChartLabels: string[] = ['No Response', 'Positive Response', 'No Status'];
  public pieChartData: number[] = [0, 0, 0];
  public pieChartType: string = 'pie';

  ngOnInit() {
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  formatTime(date) {
    var hour = date.getHours();
    var minute = date.getMinutes();

    return hour + ':' + minute;
  }

  lookupAll() {
    this.logs = [];
    this.currentNum = '';
    let yes = 0;
    let no = 0;
    let none = 0;
    this.http.getAllLogs().subscribe((logs) => {
      this.logs = logs;
      this.logs.forEach((log) => {
        log.createdAt = this.formatDate(new Date(log.createdAt));
        log.updatedAt = this.formatTime(new Date(log.updatedAt));
        if (log.status) {
          no = no + 1;
        } else if (log.status === false) {
          yes = yes + 1;
        } else {
          none = none + 1;
        }
      });
      this.pieChartData = [yes, no, none];
    });
  }

  onSubmit() {
    console.log(this.currentNum);
    let yes = 0;
    let no = 0;
    let none = 0;
    this.currentNum = this.numberForm.form.value.patientNum;
    this.http.getLogs(this.currentNum).subscribe((logs) => {
      this.logs = logs;
      this.logs.forEach((log) => {
        log.createdAt = this.formatDate(new Date(log.createdAt));
        log.updatedAt = this.formatTime(new Date(log.updatedAt));
        if (log.status) {
          no = no + 1;
        } else if (log.status === false) {
          yes = yes + 1;
        } else {
          none = none + 1;
        }
      });
      this.pieChartData = [yes, no, none];
      this.numberForm.reset();
      console.log(this.logs);
    });
  }



}
