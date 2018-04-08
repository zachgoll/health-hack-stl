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
  public pieChartLabels: string[] = ['No Response', 'Took Medication'];
  public pieChartData: number[] = [0, 0];
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

  onSubmit() {
    const yes = 0;
    const no = 0;
    this.currentNum = this.numberForm.form.value.patientNum;
    this.http.getLogs(this.currentNum).subscribe((logs) => {
      this.logs = logs;
      this.logs.forEach((log) => {
        if (log.status) {
          console.log('est');
        }
      });
      console.log(this.logs);
    });
  }



}
