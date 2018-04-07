import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private http: HttpService) { }

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
      primaryNum: this.scheduleForm.form.value.primary,
      secondaryNum: this.scheduleForm.form.value.secondary,
      patientNum: this.scheduleForm.form.value.patient,
      frequency: this.scheduleForm.form.value.frequency,
      hour: this.time.hour,
      minute: this.time.minute
    }

    console.log(call);
  }

}
