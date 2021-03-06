import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { HttpService } from './services/http.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CreditsComponent } from './credits/credits.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'credits', component: CreditsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScheduleComponent,
    SummaryComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ChartsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
