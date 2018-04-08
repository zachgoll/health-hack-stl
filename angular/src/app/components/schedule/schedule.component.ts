import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private http: HttpService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

  time = { hour: 13, minute: 30 };
  meridian = true;
  loading = false;

  @ViewChild('scheduleForm') scheduleForm: NgForm;

  ngOnInit() {
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  onScheduleSubmit() {
    const call = {
      name: this.scheduleForm.form.value.name,
      primaryNum: this.scheduleForm.form.value.primary,
      patientName: this.scheduleForm.form.value.patientName,
      patientNum: this.scheduleForm.form.value.patient,
      frequency: this.scheduleForm.form.value.frequency,
      hour: this.time.hour,
      minute: this.time.minute
    }

    this.http.postCall(call).subscribe((data) => {
      this.loading = true;
      this.spinnerService.show();
      this.scheduleForm.reset();
      setTimeout(() => {
        this.loading = false;
        this.spinnerService.hide();
        this.router.navigate(['/summary']);
      }, 15000);
    }, (err) => {
      this.loading = true;
      this.spinnerService.show();
      console.log(err);
    });
  }

}
