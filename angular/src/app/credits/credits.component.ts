import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';



@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  constructor() { }

  @ViewChild('creditsForm') creditsForm: NgForm;

  ngOnInit() {
  }

}
