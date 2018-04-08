import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { HttpService } from './services/http.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'schedule', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScheduleComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ChartsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
