import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private http: HttpService, private router: Router) { }

  time = { hour: 13, minute: 30 };
  meridian = true;

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
      console.log(data);
      this.scheduleForm.reset();
      setTimeout(() => {
        this.router.navigate(['/summary']);
      }, 5000);
    }, (err) => {
      console.log(err);
    });
  }

}
